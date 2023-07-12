//----------> require module
const mongodb = require("mongodb");

const mongoClient = mongodb.MongoClient;

let _database;

const connectToDatabase = async (uri) => {
  try {
    //----------> create connection
    const mongoConnect = await mongoClient.connect(uri);
    //----------> get database from connection response
    _database = mongoConnect.db();
  } catch (error) {
    throw error;
  }
};

const getDatabase = () => {
  if (_database) {
    return _database;
  }
  return "No database found";
};

module.exports = { connectToDatabase, getDatabase };
