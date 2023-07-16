const User = require("../models/user");

//----------> view the shop page
exports.viewShopPage = (req, res) => {
  User.getAllProducts()
    .then((products) => {
      res.render("user/shop", { path: "/", pageTitle: "Shop", products });
    })
    .catch((error) => console.log(error));
};
exports.viewCartPage = (req, res) => {
  req.user
    .fetchCart()
    .then((cart) =>
      res.render("user/cart.ejs", {
        cart,
        pageTitle: "Cart",
        path: "/cart",
        products: [],
      })
    )
    .catch((error) => console.log(error));
};

exports.removeCartItem = (req, res) => {
  //----------> get product id
  const { cartItemId } = req.params;
  req.user
    .deleteCartItem(cartItemId)
    .then((result) => {
      //---------->redirect to the cart page when a product is deleted
      res.redirect("/cart");
    })
    .catch((error) => console.log(error));
};

exports.addProductToCart = (req, res) => {
  const { productId } = req.params;
  req.user
    .addToCart(productId)
    .then((cart) => {
      res.status(200).json({ cart });
    })
    .catch((error) => console.log(error));
};

exports.getAllCartItems = (req, res, next) => {
  req.user
    .fetchCart()
    .then((cart) => res.status(200).json({ cart }))
    .catch((error) => console.log(error));
};

exports.increaseCartItemQuantity = (req, res) => {
  //----------> get product id
  const { cartItemId } = req.params;
  //----------> delete product

  req.user
    .increaseCartItemQuantity(cartItemId)
    .then((result) => {
      //---------->redirect to the cart page when a product is deleted
      res.redirect("/cart");
    })
    .catch((error) => console.log(error));
};
exports.decreaseCartItemQuantity = (req, res) => {
  //----------> get product id
  const { cartItemId } = req.params;

  req.user
    .decreaseCartItemQuantity(cartItemId)
    .then((result) => {
      //---------->redirect to the cart page when a product is deleted
      res.redirect("/cart");
    })
    .catch((error) => console.log(error));
};
