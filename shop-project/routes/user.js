//? import statements
const express = require("express");
const {
  getAllProducts,
  addProductToCart,
  getAllCartItems,
  viewCartPage,
  removeCartItem,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
} = require("../controllers/user");

const router = express.Router();

router.get("/", getAllProducts);
//-----> add product to cart
router.route("/cart").get(viewCartPage);
router.route("/cart/add/:productId").post(addProductToCart);
router.route("/cart/items").get(getAllCartItems);
router.route("/cart/remove/:cartItemId").post(removeCartItem);
router.route("/cart/decrease/:cartItemId").post(decreaseCartItemQuantity);
router.route("/cart/increase/:cartItemId").post(increaseCartItemQuantity);

module.exports = router;
