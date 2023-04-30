const { ObjectId } = require("mongodb");

class OrderService {
    constructor(client) {
        this.Order = client.db().collection("orders");
    }

    extractOrderData(payload) {
        const order = {
            customer_id: payload.customer_id,
            products: payload.products,
            total: payload.total,
        };

        Object.keys(order).forEach(
            (key) => order[key] === undefined && delete order[key]
        );
        return order;
    }

    //Cần sửa lại tìm kiếm theo id của order
    async addToOrder(payload) {
        const order = this.extractOrderData(payload);
        order.created_at = new Date().toLocaleString();
        order.updated_at = new Date().toLocaleString();
        return await this.Order.insertOne(order);
    }

    async findById(id) {
        return await this.Order.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async find(filter) {
        // const cursor = await this.Order.find(filter);
        const cursor = await this.Order.aggregate([
            {
                $lookup: {
                    from: "customer",
                    localField: "customer_id",
                    foreignField: "_id",
                    as: "customer",
                },
            },
            {
                $unwind: "$customer",
            },
            {
                $project: {
                    _id: 1,
                    "customer.name": 1, // Lấy tên của category
                    products: 1,
                    total: 1,
                    created_at: 1,
                    updated_at: 1,
                },
            },
            {
                $match: filter,
            },
        ]);
        return await cursor.toArray();
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };

        const update = {
            name: payload.name,
            updated_at: new Date().toLocaleString(),
        };

        const result = await this.Order.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async updateOrderStatus(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };

        const update = {
            $set: {
                "products.$.quantity": newQuantity,
                "products.$.subtotal": newQuantity * products.find(p => p.product_id === product_id).price
            },
            $inc: {
                total: (newQuantity - products.find(p => p.product_id === product_id).quantity) * products.find(p => p.product_id === product_id).price
            }
        };

        const result = await this.Order.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );

        return result.value;
    }
}

module.exports = OrderService;