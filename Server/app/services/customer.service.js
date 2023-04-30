const { ObjectId } = require("mongodb");
const bcrypt = require('bcryptjs');

class CustomerService {
    constructor(client) {
        this.Customer = client.db().collection("customer");
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API 
    extractCustomerData(payload) {
        const customer = {
            email: payload.email,
            password: bcrypt.hashSync(payload.password, 8),
            name: payload.name,
            phone: payload.phone,
            // age: payload.age,
            birthday: payload.birthday,
            sex: payload.sex,
            address: payload.address,
            cart: payload.cart || [],
            // total: products.reduce((acc, cur) => acc + cur.subtotal, 0),
        }

        // Loại bỏ những trường không không được định nghĩa
        Object.keys(customer).forEach(
            (key) => customer[key] === undefined && delete customer[key]
        );
        return customer;
    }

    async signUp(payload) {
        const customer = this.extractCustomerData(payload);
        return await this.Customer.insertOne(customer);
    }

    async signIn(payload) {
        const customer = await this.findByEmail(payload.email);

        if (!customer)
            return customer;

        const passwordIsValid = bcrypt.compareSync(payload.password, customer.password);

        if (passwordIsValid)
            return customer;
        return passwordIsValid;
    }

    async addToken(id, token) {

        const result = await this.Customer.updateOne(
            { _id: new ObjectId(id) },
            { $set: { token: token } }
        );
        return result.modifiedCount > 0;
    }

    async deleteToken(id, token) {
        const result = await this.Customer.updateOne(
            { _id: new ObjectId(id), token: token },
            { $unset: { token: 1 } }
        );
        return result.modifiedCount > 0;
    }

    async findByEmail(email) {
        return await this.Customer.findOne({ email: email });
    }

    async findById(id) {
        return await this.Customer.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async find(filter) {
        const cursor = await this.Customer.find(filter);
        return await cursor.toArray();
    }

    /************  Cart ***********/
    async extractCartData(payload) {

        const cart = {
            product_id: payload.product_id,
            name: payload.name,
            description: payload.description,
            image: payload.image,
            price: payload.price,
            quantity: payload.quantity,
            category_id: payload.category_id,
            subtotal: payload.quantity * payload.price,
        };

        // Loại bỏ những trường không không được định nghĩa
        Object.keys(cart).forEach(
            (key) => cart[key] === undefined && delete cart[key]
        );
        return cart;
    }

    //Thêm vào giỏ hàng
    async addToCart(customerId, payload) {
        const cart = await this.extractCartData(payload);

        // Tìm kiếm sản phẩm trong giỏ hàng của khách hàng
        const existingProduct = await this.Customer.findOne(
            { _id: new ObjectId(customerId), "cart.product_id": payload.product_id }
        );

        // Nếu sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng sản phẩm và tính lại tổng giá trị
        if (existingProduct) {
            const existingCartItem = existingProduct.cart.find(item => item.product_id === payload.product_id);
            const newQuantity = existingCartItem.quantity + cart.quantity;
            const newSubtotal = newQuantity * existingCartItem.price;

            const result = await this.Customer.updateOne(
                { _id: new ObjectId(customerId), "cart.product_id": payload.product_id },
                {
                    $set: {
                        "cart.$.quantity": newQuantity,
                        "cart.$.subtotal": newSubtotal,
                    },
                }
            );
            return result.modifiedCount > 0;

        } else {
            // Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm vào giỏ hàng
            const result = await this.Customer.updateOne(
                { _id: new ObjectId(customerId) },
                { $push: { cart: cart } }
            );
            return result.modifiedCount > 0;
        }
    }

    //Cập nhật số lượng cho sản phẩm 
    async updateProductQuantityFromCart(customerId, product_id, quantity) {
        const product = await this.Customer.findOne({ _id: new ObjectId(customerId), "cart.product_id": product_id });
        const subtotal = product.cart[0].price * quantity;
        const result = await this.Customer.updateOne(
            { _id: new ObjectId(customerId), "cart.product_id": product_id },
            {
                $set: {
                    "cart.$.quantity": quantity,
                    "cart.$.subtotal": subtotal,
                },
            }
        );
        return result.modifiedCount > 0;
    }

    //Xóa sản phẩm chỉ định trong giỏ hàng
    async deleteProductFromCart(customerId, product_id) {
        console.log(product_id);
        const result = await this.Customer.updateOne(
            { _id: new ObjectId(customerId) },
            { $pull: { cart: { product_id } } }
        );
        return result.modifiedCount > 0;
    }

    //Xóa tất cả sản phẩm trong giỏ hàng
    async deleteAllProductsFromCart(customerId) {
        const result = await this.Customer.updateOne(
            { _id: new ObjectId(customerId) },
            { $set: { cart: [] } }
        );

        console.log(result.modifiedCount);
        return result.modifiedCount > 0;
    }

}
module.exports = CustomerService;