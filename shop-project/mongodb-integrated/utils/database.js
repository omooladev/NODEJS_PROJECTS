//----------> require module
const mongodb = require("mongodb");

const mongoClient = mongodb.MongoClient;

let _database;

const connectToDatabase = async (uri) => {
  console.time("MongoDB Connection Time");
  try {
    //----------> create connection
    const mongoConnect = await mongoClient.connect(uri);
    //----------> get database from connection response
    _database = mongoConnect.db();
    console.log("connected to database");

    console.timeEnd("MongoDB Connection Time");
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
