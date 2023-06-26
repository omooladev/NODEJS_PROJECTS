const fs = require("fs");
const path = require("path");

const pathToProductsList = path.join(path.dirname(require.main.filename), "data", "products.json");

const getAllProducts = (callback) => {
  //? Read products from products json file
  fs.readFile(pathToProductsList, (error, productsList) => {
    if (!error) {
      return callback(JSON.parse(productsList));
    }
    return callback([]);
  });
};

module.exports = class Product {
  constructor(productName, productPrice, productDescription, productImageUrl) {
    this.productName = productName;
    this.productPrice = productPrice;
    this.productDescription = productDescription;
    this.productImageUrl = productImageUrl;
  }

  save(callback) {
    getAllProducts((oldProducts) => {
      //?automatically add id to the new product
      const newProduct = { id: Math.random(), ...this };
      const updatedProducts = JSON.stringify([newProduct, ...oldProducts]);
      fs.writeFile(pathToProductsList, updatedProducts, (error, products) => {
        if (!error) {
          return callback({ success: true, message: "Product has been created successfully" });
        }
        return callback({ success: false, message: "An error has occurred" });
      });
    });
  }

  static fetchAllProducts(callback) {
    getAllProducts((products) => {
      return callback(products);
    });
  }
};
