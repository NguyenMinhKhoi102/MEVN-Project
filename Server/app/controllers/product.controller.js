const ProductService = require("../services/product.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

exports.create = async (req, res, next) => {
    if (!req.body?.name)
        return next(new ApiError(400, "Name are not empty"));
    if (!req.body?.description)
        return next(new ApiError(400, "Description are not empty"));
    if (!req.body?.price)
        return next(new ApiError(400, "Price are not empty"));
    if (!req.body?.quantity)
        return next(new ApiError(400, "Quantity are not empty"));

    console.log(req.body)
    console.log(req.file.path)

    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.create({
            ...req.body,
            image: req.file?.path // Lưu đường dẫn ảnh vào database
        });
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the product")
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0)
        return next(new ApiError(400, "Data to update can not be empty"));
    console.log(req.file);

    try {
        const productService = new ProductService(MongoDB.client);
        const updatedProduct = await productService.update(req.params.id, {
            ...req.body,
            image: req.file.path
        });

        return res.send({ message: "Product was updated successfully", data: updatedProduct });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating product with id=${req.params.id}`)
        );
    }
};

// Retrieve all products from database
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const productService = new ProductService(MongoDB.client);
        const { name } = req.query;
        if (name)
            documents = await productService.findByName(name);
        else
            documents = await productService.find({});

    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving products")
        );
    }

    return res.send(documents);
};

// Find a single product with an id
exports.findOne = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.findById(req.params.id);
        if (!document)
            return next(new ApiError(404, "Product not found"));

        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `Error retrieving product with id=${req.params.id}`)
        );
    }
};



// Delete a product with the specified id in the request
exports.delete = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Product not found"));
        }
        return res.send({ message: "Product was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Could not delete product with id=${req.params.id}`)
        );
    }
};

// Delete all products from the database
exports.deleteAll = async (_req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const deletedCount = await productService.deleteAll();
        return res.send({
            message: `${deletedCount} products were deleted successfully`,
        });
    } catch (error) {
        return next(new ApiError(500, "An error occurred while deleting products"));
    }
};


exports.findByCategory = async (req, res) => {
    try {
        const categoryId = req.params.category_id;
        const products = await ProductService.findByCategory({ category: categoryId });
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Đã xảy ra lỗi khi tìm kiếm sản phẩm theo danh mục." });
    }
};

