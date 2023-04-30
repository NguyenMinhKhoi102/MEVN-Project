const express = require("express");
const admin = require("../controllers/admin.controller");

const router = express.Router();

router.route("/signin").post(admin.signIn);
router.route("/signup").post(admin.signUp);
router.route("/signout").post(admin.signOut);

module.exports = router;