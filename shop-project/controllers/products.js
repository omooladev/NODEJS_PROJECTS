const Product = require("../models/product");
const viewAddProductPage = (req, res) => {
  res.render("add-product", { pageTitle: "Add New Product", path: "/admin/add-product" });
};

const addProductToList = (req, res) => {
  const { productName, productPrice, productTransformedImage: productImageUrl } = req.body;
  const { productImage } = req.files;

  if (!productName || !productPrice || !productImageUrl || !productImage) {
    return res.status(400).json({ message: "Please provide values for all the fields" });
  }
  const product = new Product(productName, productPrice, productImageUrl);
  product.save(({ success, message }) => {
    if (success === true) {
      return res.status(201).json({ message });
    }
    return res.status(400).json({ message });
  });
};

module.exports = { viewAddProductPage, addProductToList };
