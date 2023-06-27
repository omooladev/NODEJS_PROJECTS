const adminDocs = require("./adminDocs");
const userDocs = require("./userDocs");

const swaggerDocumentation = {
  openapi: "3.0.0",
  info: {
    title: "ShopCommerce",
    version: "1.0.0",
    description:
      "The ShopCommerce API is a RESTful API that allows users to purchase products and administrators to add products",
  },
  servers: [{ url: "http://localhost:5000/", description: "Local Dev" }],
  paths: { ...adminDocs, ...userDocs },
};

module.exports = swaggerDocumentation;
