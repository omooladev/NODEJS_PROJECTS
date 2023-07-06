//? import statements
const express = require("express");
const {
  getAllProducts,
  addProductToCart,
  getAllCartItems,
  viewCartPage,
} = require("../controllers/user");

const router = express.Router();

router.get("/", getAllProducts);
//-----> add product to cart
router.route("/cart").get(viewCartPage)
router.route("/cart/add/:productId").post(addProductToCart);
router.route("/cart/items").get(getAllCartItems);

module.exports = router;
