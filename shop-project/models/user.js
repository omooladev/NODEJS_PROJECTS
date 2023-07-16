const { ObjectId } = require("mongodb");
const { getDatabase } = require("../utils/database");

const Product = require("./product");

module.exports = class User {
  constructor(_id, name, email, cart) {
    this._id = _id;
    this.name = name;
    this.email = email;
    this.cart = cart; //{items:[{productId:1,quantity:1}],numberOfCartItems,totalAmount}
  }

  //----------> get all the products in the store
  static getAllProducts() {
    return Product.fetchAll()
      .then((products) => products)
      .catch((error) => console.log(error));
  }

  //----------> add product to cart
  async addToCart(productId) {
    const database = getDatabase();

    //----------> destructure the cart and assign a default value if the key values are not found
    //means if this.cart is undefined return empty object
    let { items = null, numberOfCartItems = 0, totalAmount = null } = this.cart ?? {};
    let cart;
    //----------> find the product with that id
    const product = await Product.findById(productId)
      .then((product) => product)
      .catch((error) => console.log(error));

    if (!product) {
      throw "Product id is invalid";
    }

    if (!items) {
      //----------> if no items is found in the user cart
      cart = {
        items: [{ productId: product._id, quantity: 1 }],
        numberOfCartItems: 1,
        totalAmount: product.price,
      };
    } else {
      //----------> if items is found in the user cart

      //----------> check if the product id already exist in the cart
      const productIndex = items.findIndex((item) => item.productId.toString() === productId);

      if (productIndex === -1) {
        //----------> means if product is not found in cart

        items = [...items, { productId: product._id, quantity: 1 }];
        numberOfCartItems += 1;
        totalAmount = totalAmount + product.price;
        cart = { items, numberOfCartItems, totalAmount };
      } else {
        //----------> means if product is already in cart

        let item = items[productIndex];
        item.quantity += 1;
        items[productIndex] = item;
        totalAmount = totalAmount + product.price;
        cart = { items, numberOfCartItems, totalAmount };
      }
    }
    //----------> save cart to database and return the updated document
    return database
      .collection("users")
      .findOneAndUpdate(
        { _id: this._id },
        {
          $set: {
            cart,
          },
        },
        { returnDocument: "after" }
      )
      .then((result) => result.value.cart)
      .catch((error) => console.log(error));
  }

  //----------> fetch cart
  async fetchCart() {
    const database = getDatabase();
    //----------> get the user cart
    let cart = this.cart;
    //----------> get all the product id in the cart items
    const productIds = this.cart.items.map((item) => item.productId);
    //----------> check and return the full product details of the item id found in the products collection
    let cartItems = await database
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray();
    //----------> map through the product details and add the quantity to it
    cartItems = cartItems.map((cartItem) => {
      return {
        ...cartItem,
        quantity: this.cart.items.find(
          (item) => item.productId.toString() === cartItem._id.toString()
        ).quantity,
      };
    });
    //----------> get all key values in the user cart with the returned cart items details
    cart = { ...cart, items: [...cartItems] };
    return cart;
  }
  //----------> delete cart item
  async deleteCartItem(cartItemId) {
    const database = getDatabase();
    let cart;
    let { items, numberOfCartItems, totalAmount } = this.cart;

    //----------> find the price of the cart item from the product collection
    let cartItem = await database.collection("products").findOne({ _id: new ObjectId(cartItemId) });

    //----------> find quantity from the cart in the user collection
    let quantity = items.find((item) => {
      if (item.productId.toString() === cartItemId) {
        return item;
      }
    }).quantity;

    numberOfCartItems -= 1;
    totalAmount = totalAmount - cartItem.price * quantity;
    cart = {
      items: items.filter((item) => item.productId.toString() !== cartItemId),
      numberOfCartItems,
      totalAmount,
    };

    return database
      .collection("users")
      .findOneAndUpdate({ _id: this._id }, { $set: { cart } })
      .then((result) => result)
      .catch((error) => console.log(error));
  }
  //----------> increase quantity
  async increaseCartItemQuantity(cartItemId) {
    const database = getDatabase();
    let cart;
    let { items, numberOfCartItems, totalAmount } = this.cart;

    //----------> find the  cart item from the product collection
    let cartItem = await database.collection("products").findOne({ _id: new ObjectId(cartItemId) });

    //----------> get the index of the cart item from the user cart
    let itemIndex = items.findIndex((item) => item.productId.toString() === cartItemId);
    let item = items[itemIndex];
    //----------> increase the quantity by 1
    item.quantity += 1;
    items[itemIndex] = item;

    //----------> add the item price to the total amount
    totalAmount = totalAmount + cartItem.price;

    cart = {
      items,
      numberOfCartItems,
      totalAmount,
    };

    return database
      .collection("users")
      .findOneAndUpdate({ _id: this._id }, { $set: { cart } })
      .then((result) => result)
      .catch((error) => console.log(error));
  }
  //----------> decrease quantity
  async decreaseCartItemQuantity(cartItemId) {
    const database = getDatabase();
    let cart;
    let { items, numberOfCartItems, totalAmount } = this.cart;

    //----------> find the  cart item from the product collection
    let cartItem = await database.collection("products").findOne({ _id: new ObjectId(cartItemId) });

    //----------> get the index of the cart item from the user cart
    let itemIndex = items.findIndex((item) => item.productId.toString() === cartItemId);
    let item = items[itemIndex];

    if (item.quantity === 1) {
      return;
    }
    //----------> decrease the quantity by 1
    item.quantity -= 1;
    items[itemIndex] = item;

    //----------> add the item price to the total amount
    totalAmount = totalAmount - cartItem.price;

    cart = {
      items,
      numberOfCartItems,
      totalAmount,
    };

    return database
      .collection("users")
      .findOneAndUpdate({ _id: this._id }, { $set: { cart } })
      .then((result) => result)
      .catch((error) => console.log(error));
  }
};
