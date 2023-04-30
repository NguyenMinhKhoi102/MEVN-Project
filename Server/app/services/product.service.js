const { ObjectId } = require("mongodb");

class ProductService {
    constructor(client) {
        this.Product = client.db().collection("products");
    }

    extractProductData(payload) {

        // Chuyển string thành ObjectId
        payload.category_id = new ObjectId(payload.category_id);

        const product = {
            name: payload.name,
            description: payload.description,
            price: payload.price,
            // image: payload.image,
            image: payload.image !== undefined ? payload.image : undefined, // Không ghi đè nếu payload.image là undefined
            quantity: payload.quantity,
            category_id: payload.category_id // Chuyển đổi category_id sang ObjectId
        };

        // Remove undefined fields
        Object.keys(product).forEach(
            (key) => product[key] === undefined && delete product[key]
        );

        return product;
    }

    async create(payload) {
        const product = this.extractProductData(payload);
        product.created_at = new Date().toLocaleString();
        product.updated_at = new Date().toLocaleString();
        return await this.Product.insertOne(product);
    }

    async find(filter) {
        const cursor = await this.Product.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "category_id",
                    foreignField: "_id",
                    as: "category",
                },
            },
            {
                $unwind: "$category",
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    price: 1,
                    image: 1,
                    quantity: 1,
                    "category": 1, // Lấy tên của category
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


    async findById(id) {
        return await this.Product.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        // console.log(id); // Thêm dòng này để in ra giá trị của biến update

        const update = {
            name: payload.name,
            description: payload.description,
            price: payload.price,
            image: payload.image,
            quantity: payload.quantity,
            category_id: new ObjectId(payload.category_id), // Chuyển đổi category_id sang ObjectId
            updatedAt: new Date().toLocaleString(),
        };

        // console.log(update); // Thêm dòng này để in ra giá trị của biến update

        const result = await this.Product.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );

        return result.value;
    }


    async delete(id) {
        const result = await this.Product.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async deleteAll() {
        const result = await this.Product.deleteMany({});
        return result.deletedCount;
    }

    async findProductByCategoryId(categoryId) {
        const filter = {
            category_id: new ObjectId(categoryId)
        };
        const cursor = await this.Product.find(filter);
        return await cursor.toArray();
    }
}

module.exports = ProductService;