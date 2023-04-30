const jwt = require("jsonwebtoken");
const jwtSecret = "mysecretkey";

const CustomerService = require("../services/customer.service");


const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.signUp = async (req, res, next) => {
    if (!req.body.email)
        return next(new ApiError(400, "Email are required"));
    if (!req.body.password)
        return next(new ApiError(400, "Password are required"));
    if (!req.body.name)
        return next(new ApiError(400, "Name are required"));
    if (!req.body.phone)
        return next(new ApiError(400, "Phone are required"));
    if (!req.body.birthday)
        return next(new ApiError(400, "Birthday are required"));
    if (!req.body.sex)
        return next(new ApiError(400, "Sex are required"));
    if (!req.body.address)
        return next(new ApiError(400, "Address are required"));
    try {
        const customerService = new CustomerService(MongoDB.client);
        const existingCustomer = await customerService.findByEmail(req.body.email);
        if (existingCustomer)
            return next(new ApiError(400, "Email is already taken"));
        const customer = await customerService.signUp(req.body);
        if (customer)
            return res.send({ message: "Signup successfully" });
    } catch (error) {
        return next(new ApiError(500, "An error occurred while signing up"));
    }
}

exports.signIn = async (req, res, next) => {
    if (!req.body.email)
        return next(new ApiError(400, "Email are required"));
    if (!req.body.password)
        return next(new ApiError(400, "Password are required"));

    try {
        const customerService = new CustomerService(MongoDB.client);
        const customer = await customerService.signIn(req.body);
        if (!customer)
            return next(new ApiError(401, "Invalid email or password"));
        //Mã hoá id bằng jwtSecret thành token trong 24h
        const token = jwt.sign({ id: customer._id }, jwtSecret, {
            expiresIn: 86400, //24h
        });
        //Thêm token vào CSDL
        await customerService.addToken(customer._id, token);

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
        const customerService = new CustomerService(MongoDB.client);
        //Xoá token
        await customerService.deleteToken(decodedToken.id, token);

        return res.send({ message: "Signout successfully" });
    } catch (error) {
        return next(new ApiError(500, "An error occurred while signing out"));
    }
}

exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const customerService = new CustomerService(MongoDB.client);
        const { email } = req.query;
        if (email)
            documents = await customerService.findByEmail(email);
        else
            documents = await customerService.find({});

    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving customers")
        );
    }

    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const customerService = new CustomerService(MongoDB.client);
        console.log(1);
        const document = await customerService.findById(req.params.id);
        console.log(document);
        if (!document)
            return next(new ApiError(404, "Customer not found"));
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `Error retrieving customer with id=${req.params.id}`)
        );
    }
};

//Add to Cart
exports.addToCart = async (req, res, next) => {
    try {
        const customerService = new CustomerService(MongoDB.client);

        const authHeader = req.headers.authorization;
        if (!authHeader)
            return next(new ApiError(401, "Unauthorized"));
        const token = authHeader.split(" ")[1];
        const decodedToken = jwt.decode(token);

        console.log(decodedToken.id);
        console.log(req.body);

        const customer = await customerService.findById(decodedToken.id);

        if (!customer) {
            return next(new ApiError(404, "Customer not found"));
        }

        await customerService.addToCart(decodedToken.id, req.body);
        return res.send({ message: "Add products to customer successfully" });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while adding products to customer")
        );
    }
};

// Retrive all carts of a user from database
exports.findAllCart = async (req, res, next) => {
    let documents = [];

    try {
        const customerService = new CustomerService(MongoDB.client);

        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(new ApiError(401, "Unauthorized"));
        }
        const token = authHeader.split(" ")[1];
        const decodedToken = jwt.decode(token);

        const customer = await customerService.findById(decodedToken.id);

        if (!customer) {
            return next(new ApiError(404, "Customer not found"));
        }

        // Get all carts of the customer
        documents = customer.cart;

    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving carts")
        );
    }
    return res.send(documents);
};

// Delete a product from cart of a customer with the specified id
exports.deleteProductFromCart = async (req, res, next) => {
    try {
        const customerService = new CustomerService(MongoDB.client);

        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(new ApiError(401, "Unauthorized"));
        }
        const token = authHeader.split(" ")[1];
        const decodedToken = jwt.decode(token);

        const customerId = decodedToken.id;

        const customer = await customerService.findById(customerId);

        if (!customer) {
            return next(new ApiError(404, "Customer not found"));
        }
        console.log(req.params.id);
        await customerService.deleteProductFromCart(decodedToken.id, req.params.id);

        return res.send({ message: "Product was removed from cart successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Could not delete product with id=${req.params.id} from cart`)
        );
    }
};

// Delete a product from cart of a customer with the specified id
exports.deleteAllProductsFromCart = async (req, res, next) => {
    try {
        const customerService = new CustomerService(MongoDB.client);

        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(new ApiError(401, "Unauthorized"));
        }
        const token = authHeader.split(" ")[1];
        const decodedToken = jwt.decode(token);

        const customerId = decodedToken.id;

        const customer = await customerService.findById(customerId);

        if (!customer) {
            return next(new ApiError(404, "Customer not found"));
        }

        await customerService.deleteAllProductsFromCart(decodedToken.id);

        return res.send({ message: "Product was removed from cart successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Could not delete product with id=${req.body.product_id} from cart`)
        );
    }
};

exports.updateProductQuantityFromCart = async (req, res, next) => {
    try {
        const customerService = new CustomerService(MongoDB.client);

        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(new ApiError(401, "Unauthorized"));
        }
        const token = authHeader.split(" ")[1];
        const decodedToken = jwt.decode(token);

        const customerId = decodedToken.id;

        const customer = await customerService.findById(customerId);

        if (!customer) {
            return next(new ApiError(404, "Customer not found"));
        }


        if (!req.body.quantity) {
            return next(new ApiError(400, "Quantity can not be empty"));
        }

        console.log(req.params.id);
        console.log(req.body.quantity);

        await customerService.updateProductQuantityFromCart(decodedToken.id, req.params.id, req.body.quantity);

        return res.send({ message: "Product quantity was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Could not update product quantity with id=${req.params.product_id}`)
        );
    }
};

