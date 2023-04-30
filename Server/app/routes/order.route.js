const express = require("express");
const order = require("../controllers/order.controller");

const router = express.Router();

router.route("/")
    .post(order.addToOrder)
    .get(order.findAllOrders)

router.route("/:id")
    .get(order.findOne)

module.exports = router;