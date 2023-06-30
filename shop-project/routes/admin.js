//? import statements
const express = require("express");

const { viewAddProductPage, addProductToList, getAllProducts } = require("../controllers/admin");
const router = express.Router();

router.route("/add-product").get(viewAddProductPage).post(addProductToList);
router.route("/products").get(getAllProducts);

module.exports = router;
