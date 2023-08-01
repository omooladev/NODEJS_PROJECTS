//----------> import modules
const mongoose = require("mongoose");

module.exports.connectToDatabase = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("connected to database");
  } catch (error) {
    throw error;
  }
};
