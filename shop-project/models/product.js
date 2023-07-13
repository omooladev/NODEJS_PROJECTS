//----------> import modules
const mongodb = require("mongodb");
const { getDatabase } = require("../utils/database");

const ObjectId = mongodb.ObjectId;

module.exports = class Product {
  constructor(name, price, description, imageUrl) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }
  //----------> save to database
  async save() {
    const database = getDatabase();
    try {
      const product = await database.collection("products").insertOne(this);
      return { success: true, message: "product has been added successfully" };
    } catch (error) {
      return { success: false, message: error };
    }
  }
  //----------> update a single product
  updateById(productId) {
    const database = getDatabase();
    return database
      .collection("products")
      .updateOne({ _id: new ObjectId(productId) }, { $set: this })
      .then((result) => {
        return { success: true, message: "Product has been edited successfully" };
      })
      .catch((error) => console.log(error));
  }
  //----------> fetch a single product
  static findById(productId) {
    const database = getDatabase();
    return database
      .collection("products")
      .findOne({ _id: new ObjectId(productId) })
      .then((result) => result)
      .catch((error) => console.log(error));
  }

  //---------->fetch all the products from the database
  static fetchAll() {
    const database = getDatabase();
    return database.collection("products").find().toArray();
  }
  //---------->delete a product from the database
  static delete(productId) {
    const database = getDatabase();
    return database.collection("products").deleteOne({ _id: new ObjectId(productId) });
  }
};
