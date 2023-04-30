const jwt = require("jsonwebtoken");
const jwtSecret = "mysecretkey";

const AdminService = require("../services/admin.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.signUp = async (req, res, next) => {
    if (!req.body.username)
        return next(new ApiError(400, "Username are required"));
    if (!req.body.password)
        return next(new ApiError(400, "Password are required"));

    try {
        const adminService = new AdminService(MongoDB.client);
        const existingAdmin = await adminService.findByUsername(req.body.username);
        if (existingAdmin)
            return next(new ApiError(400, "Username is already taken"));
        const admin = await adminService.signUp(req.body);
        if (admin)
            return res.send({ message: "Signup successfully" });
    } catch (error) {
        return next(new ApiError(500, "An error occurred while signing up"));
    }
}

exports.signIn = async (req, res, next) => {
    if (!req.body.username)
        return next(new ApiError(400, "Username are required"));
    if (!req.body.password)
        return next(new ApiError(400, "Password are required"));
    try {
        const adminService = new AdminService(MongoDB.client);
        const admin = await adminService.signIn(req.body);
        if (!admin)
            return next(new ApiError(401, "Invalid username or password"));
        //Mã hoá id bằng jwtSecret thành token trong 24h
        const token = jwt.sign({ id: admin._id }, jwtSecret, {
            expiresIn: 86400, //24h
        });
        //Thêm token vào CSDL
        await adminService.addToken(admin._id, token);

        res.setHeader("Authorization", "Bearer " + token);

        return res.send({ message: "Signin successfully", token: token });
    } catch (error) {
        return next(new ApiError(500, "An error occurred while signing in"));
    }
}

exports.signOut = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader)
            return next(new ApiError(401, "Unauthorized"));
        const token = authHeader.split(" ")[1];
        const decodedToken = jwt.decode(token);
        const adminService = new AdminService(MongoDB.client);
        //Xoá token
        await adminService.deleteToken(decodedToken.id, token);

        return res.send({ message: "Signout successfully" });
    } catch (error) {
        return next(new ApiError(500, "An error occurred while signing out"));
    }
}