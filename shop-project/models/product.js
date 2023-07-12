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
