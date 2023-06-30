//? import statements
const express = require("express");

const {
  viewAddProductPage,
  addProductToList,
  getAllProducts,
  deleteProduct,
} = require("../controllers/admin");
const router = express.Router();

router.route("/add-product").get(viewAddProductPage).post(addProductToList);
router.route("/products").get(getAllProducts);
router.route("/products/delete/:productId").post(deleteProduct);

module.exports = router;
