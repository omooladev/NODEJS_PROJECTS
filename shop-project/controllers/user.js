const Product = require("../models/product");

const getAllProducts = (req, res) => {
  Product.fetchAll()
    .then((products) => {
      res.render("user/shop", { path: "/", pageTitle: "Shop", products });
    })
    .catch((error) => console.log(error));
};
const viewCartPage = (req, res) => {
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

const removeCartItem = (req, res) => {
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

const addProductToCart = (req, res) => {
  const { productId } = req.params;
  req.user
    .addToCart(productId)
    .then((cart) => {
      res.status(200).json({ cart });
    })
    .catch((error) => console.log(error));
};

const getAllCartItems = (req, res, next) => {
  req.user
    .fetchCart()
    .then((cart) => res.status(200).json({ cart }))
    .catch((error) => console.log(error));
};

const increaseCartItemQuantity = (req, res) => {
  //----------> get product id
  const { cartItemId } = req.params;
  //----------> delete product
  // Cart.increaseCartItemQuantity(cartItemId, () => {
  //   //---------->redirect to the cart page when a product is deleted
  //   res.redirect("/cart");
  // });
};
const decreaseCartItemQuantity = (req, res) => {
  //----------> get product id
  const { cartItemId } = req.params;

  //----------> delete product
  // Cart.decreaseCartItemQuantity(cartItemId, () => {
  //   //---------->redirect to the cart page when a product is deleted
  //   res.redirect("/cart");
  // });
};
module.exports = {
  getAllProducts,
  addProductToCart,
  getAllCartItems,
  viewCartPage,
  removeCartItem,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
};
