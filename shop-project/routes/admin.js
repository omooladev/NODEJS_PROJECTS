//? import statements
const express = require("express");

const { viewAddProductPage, addProductToList } = require("../controllers/products");
const router = express.Router();

router.route("/add-product").get(viewAddProductPage).post(addProductToList);

module.exports = router;
