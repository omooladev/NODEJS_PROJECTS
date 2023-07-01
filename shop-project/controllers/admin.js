const Product = require("../models/product");

const addProductToList = (req, res) => {
  const {
    productName,
    productPrice,
    productDescription,
    productTransformedImage: productImageUrl,
  } = req.body;
  return console.log(req.body);
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
    res.render("admin/products", {
      products,
      path: "/admin/products",
      pageTitle: "Admin Products",
    });
  });
};

const deleteProduct = (req, res) => {
  //----------> get product id
  const { productId } = req.params;

  //----------> delete product
  Product.deleteProduct(productId, () => {
    //---------->redirect to the admin products page when a product is deleted
    res.redirect("/admin/products");
  });
};

//----------> view add product page
const viewAddProductPage = (req, res) => {
  res.render("admin/product-management", {
    pageTitle: "Add New Product",
    path: "/admin/add-product",
    isEditing: false,
  });
};

//----------> view edit product page
const viewEditProductPage = (req, res) => {
  const { productId } = req.params;
  Product.findById(productId, (product) => {
    res.render("admin/product-management", {
      product,
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      isEditing: true,
    });
  });
};
module.exports = {
  viewAddProductPage,
  viewEditProductPage,
  addProductToList,
  getAllProducts,
  deleteProduct,
};
