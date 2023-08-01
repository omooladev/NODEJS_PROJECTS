//? import statements
const express = require("express");
const {
  viewShopPage,
  getAllCartItems,
  addProductToCart,
  viewCartPage,
  handleCartQuantityChange,
  removeCartItem,
} = require("../controllers/user");

const router = express.Router();

//----------> route that redirects to the shop page
router.get("/", (req, res) => res.redirect("/shop"));

//----------> routes to view the shop page
router.get("/shop", viewShopPage);

//----------> route to view the cart page
router.route("/cart").get(viewCartPage);

//----------> route to add product to cart which contains the product name as a uri parameter
router.route("/cart/add/:productId").post(addProductToCart);

//----------> route to get all the cart items
router.route("/cart/items").get(getAllCartItems);

//----------> route to increase or decrease cart item quantity
router.route("/cart/:cartItemId/:action").post(handleCartQuantityChange);

//----------> route to remove product from the cart
router.route("/cart/remove/:cartItemId").post(removeCartItem);

module.exports = router;
