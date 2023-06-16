//? import statements
const express = require("express");

const { viewAddProductPage } = require("../controllers/products");
const router = express.Router();

router.route("/add-product").get(viewAddProductPage);

module.exports = router;
