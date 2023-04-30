const jwt = require("jsonwebtoken");

const OrderService = require("../services/order.service");

const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

//Add to Cart
exports.addToOrder = async (req, res, next) => {
    try {
        console.log(req.body);
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.addToOrder(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the order")
        );
    }
};

exports.findAllOrders = async (req, res, next) => {
    let documents = [];

    try {
        const orderService = new OrderService(MongoDB.client);
        const { name } = req.query;
        if (name)
            documents = await orderService.findByName(name);
        else
            documents = await orderService.find({});
        console.log(documents)

    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving orders")
        );
    }

    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        console.log(1);
        const document = await orderService.findById(req.params.id);
        console.log(document);
        if (!document)
            return next(new ApiError(404, "Order not found"));
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `Error retrieving order with id=${req.params.id}`)
        );
    }
};

exports.updateOrderStatus = async (req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);

        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(new ApiError(401, "Unauthorized"));
        }
        const token = authHeader.split(" ")[1];
        const decodedToken = jwt.decode(token);

        const orderId = decodedToken.id;

        const order = await orderService.findById(orderId);

        if (!order) {
            return next(new ApiError(404, "Order not found"));
        }

        if (!req.body.quantity) {
            return next(new ApiError(400, "Quantity can not be empty"));
        }

        console.log(req.params.id);
        console.log(req.body.quantity);

        await orderService.updateProductQuantityFromCart(decodedToken.id, req.params.id, req.body.quantity);

        return res.send({ message: "Product quantity was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Could not update product quantity with id=${req.params.product_id}`)
        );
    }
};
