const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const jwtSecret = 'mysecretkey';

// Middleware to check if the user is authenticated
const requireSignIn = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new ApiError(401, 'Unauthorized: missing or invalid token'));
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err)
            return next(new ApiError(401, 'Unauthorized: invalid token'));

        req.admin = decoded;
        next();
    });
};

const app = express();

const ApiError = require("./app/api-error");

const adminRouter = require("./app/routes/admin.route");
const customerRouter = require("./app/routes/customer.route");
const categoryRouter = require("./app/routes/category.route");
const productRouter = require("./app/routes/product.route");
const orderRouter = require("./app/routes/order.route");


app.use(cors());
app.use(express.json());
app.use("/uploads", express.static('uploads'));

app.use("/api/admin", adminRouter);
app.use("/api/customer", customerRouter);
app.use("/api/category", requireSignIn, categoryRouter);
app.use("/api/product", requireSignIn, productRouter);
app.use("/api/order", requireSignIn, orderRouter);






// handle 404 response
app.use((req, res, next) => {
    // Code ở đây sẽ chạy khi không có route được định nghĩa nào
    // khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
    return next(new ApiError(404, "Resource not found"));
});

// define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    // Middleware xử lý lỗi tập trung.Trong các đoạn code xử lý ở các route, gọi next(error) sẽ chuyển về middleware xử lý lỗi này
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to my app" });
});

module.exports = app;