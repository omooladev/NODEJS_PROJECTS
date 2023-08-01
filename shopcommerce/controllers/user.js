const Product = require("../models/product");
const User = require("../models/user");

//----------> view the shop page
exports.viewShopPage = (req, res) => {
  //---------->testing the methods
  Product.find()
    .then((products) => {
      res.render("user/shop", { path: "/", pageTitle: "Shop", products });
    })
    .catch((error) => console.log(error));
};
exports.viewCartPage = (req, res) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const items = user.cart.items.map((item) => {
        return { ...item.productId._doc, quantity: item.quantity };
      });

      const totalAmount = user.cart.totalAmount;
      const cart = { items, totalAmount };
      res.render("user/cart.ejs", {
        cart,
        pageTitle: "Cart",
        path: "/cart",
        products: [],
      });
    })
    .catch((error) => console.log(error));
};

exports.removeCartItem = (req, res) => {
  //----------> get product id
  const { cartItemId } = req.params;
  req.user
    .removeCartItem(cartItemId)
    .then((result) => {
      //---------->redirect to the cart page when a product is deleted
      res.redirect("/cart");
    })
    .catch((error) => console.log(error));
};

exports.addProductToCart = (req, res) => {
  const { productId } = req.params;
  Product.findById(productId)
    .then((product) => {
      req.user
        .addToCart(product)
        .then((cart) => {
          res.status(200).json({ cart });
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};

exports.getAllCartItems = (req, res, next) => {
  req.user
    .populate()
    .then((user) => {
      res.status(200).json({ cart: user.cart });
    })
    .catch((error) => console.log(error));
};

exports.handleCartQuantityChange = (req, res) => {
  //----------> get product id
  const { cartItemId, action } = req.params;
 
  req.user
    .handleCartQuantityChange(cartItemId,action)
    .then((result) => {
      //---------->redirect to the cart page when a product is deleted
      res.redirect("/cart");
    })
    .catch((error) => console.log(error));
};
