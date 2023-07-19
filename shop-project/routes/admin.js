//----------> import modules
const express = require("express");

const {
  viewAddProductPage,
  addProductToList,
  viewAdminProductsPage,
  editProduct,
  deleteProduct,
  viewEditProductPage,
} = require("../controllers/admin");

//----------> router
const router = express.Router();

router.route("/add-product").get(viewAddProductPage).post(addProductToList);
router.route("/products").get(viewAdminProductsPage);
// router.route("/edit-product/:productId").get(viewEditProductPage);
// router.route("/edit-product/:productId").post(editProduct);
// router.route("/products/delete/:productId").post(deleteProduct);

module.exports = router;
