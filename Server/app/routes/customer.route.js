const express = require("express");
const customer = require("../controllers/customer.controller");

const router = express.Router();

router.route("/signin").
    post(customer.signIn);
router.route("/signup").
    post(customer.signUp);
router.route("/signout").
    post(customer.signOut);

router.route("/cart")
    .post(customer.addToCart)
    .get(customer.findAllCart)
    .delete(customer.deleteAllProductsFromCart)

router.route("/cart/:id")
    .delete(customer.deleteProductFromCart)
    .patch(customer.updateProductQuantityFromCart)

//Admin
router.route("/")
    .get(customer.findAll);

//Customer
router.route("/:id")
    .get(customer.findOne);

module.exports = router;