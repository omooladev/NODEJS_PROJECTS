//? import statements
const express = require("express");

const {
  viewAddProductPage,
  addProductToList,
  getAllProducts,
  deleteProduct,
  viewEditProductPage,
} = require("../controllers/admin");
const router = express.Router();

router.route("/add-product").get(viewAddProductPage).post(addProductToList);
router.route("/edit-product/:productId").get(viewEditProductPage)
router.route("/products").get(getAllProducts);
router.route("/products/delete/:productId").post(deleteProduct);

module.exports = router;
