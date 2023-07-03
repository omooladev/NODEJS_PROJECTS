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
  constructor(name, price, description, imageUrl) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
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

  static findById(productId, callback) {
    getAllProducts((products) => {
      const product = products.find((product) => product.id.toString() === productId);
      return callback(product);
    });
  }
  static fetchAllProducts(callback) {
    getAllProducts((products) => {
      return callback(products);
    });
  }

  static deleteProduct(productId, callback) {
    //----------> get all products
    getAllProducts((products) => {
      //----------> filter the products by removing the product whose id matches the productId
      const filteredProducts = products.filter((product) => productId !== product.id.toString());

      //----------> write the filtered products to the products.json file
      fs.writeFile(pathToProductsList, JSON.stringify(filteredProducts), (error, fileContent) => {
        if (!error) {
          //----------> if no error is found, then return the callback
          return callback();
        }
        console.log(error);
      });
    });
  }
};
