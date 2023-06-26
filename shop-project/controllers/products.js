const Product = require("../models/product");
const viewAddProductPage = (req, res) => {
  res.render("add-product", { pageTitle: "Add New Product", path: "/admin/add-product" });
};

const addProductToList = (req, res) => {
  const {
    productName,
    productPrice,
    productDescription,
    productTransformedImage: productImageUrl,
  } = req.body;
  const { productImage } = req.files || "";

  if (!productName || !productPrice || !productDescription || !productImageUrl || !productImage) {
    return res.status(400).json({ message: "Please provide values for all the fields" });
  }

  if (productDescription.trim().length > 500) {
    return res.status(400).json({ message: "Products description cannot exceed 500 characters" });
  }
  const product = new Product(productName, productPrice, productDescription, productImageUrl);
  product.save(({ success, message }) => {
    if (success === true) {
      return res.status(201).json({ message });
    }
    return res.status(400).json({ message });
  });
};

const getAllProducts = (req, res) => {
  Product.fetchAllProducts((products) => {
    console.log(products);
    res.render("shop", { path: "/", pageTitle: "Shop", products });
  });
};
module.exports = { viewAddProductPage, addProductToList, getAllProducts };
