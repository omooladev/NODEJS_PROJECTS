//? import statements
const express = require("express");
const {
  getAllProducts,
  addProductToCart,
  getAllCartItems,
  viewCartPage,
  removeCartItem,
} = require("../controllers/user");

const router = express.Router();

router.get("/", getAllProducts);
//-----> add product to cart
router.route("/cart").get(viewCartPage)
router.route("/cart/add/:productId").post(addProductToCart);
router.route("/cart/items").get(getAllCartItems);
router.route("/cart/remove/:cartItemId").post(removeCartItem);

module.exports = router;
