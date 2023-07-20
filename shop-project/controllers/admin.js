const productDetailsValidator = require("../lib/productDetailsValidator");
const Product = require("../models/product");

const addProductToList = async (req, res) => {
  const { name, price, description, transformedImage: imageUrl } = req.body;
  //const { image } = req.files || "";

  const { success, message } = await productDetailsValidator({
    name,
    price,
    description,
    imageUrl,
  });
  if (!success) {
    return res.status(400).json({ message });
  }
  //----------> create a new product
  const product = new Product({
    name,
    price,
    description,
    imageUrl,
    userId: req.user,
  });

  //----------> save the product
  product
    .save()
    .then((product) => {
      if (product) {
        return res.status(201).json({ message: "Product item added successfully" });
      }
    })
    .catch((error) => console.log(error));
};

const editProduct = async (req, res) => {
  const { productId } = req.params;
  const { name, price, description, transformedImage: imageUrl } = req.body;
  //const { image } = req.files || "";

  //----------> validate product details
  const { success, message } = await productDetailsValidator({
    name,
    price,
    description,
    imageUrl,
  });
  if (!success) {
    return res.status(400).json({ message });
  }

  Product.findOneAndUpdate(
    { _id: productId },
    { name, price, description, imageUrl, userId: req.user },
    { new: true }
  )
    .then((product) => {
      if (product) {
        return res.status(201).json({ message: "Product edited successfully" });
      }
    })
    .catch((error) => console.log(error));
};

const deleteProduct = (req, res) => {
  //----------> get product id
  const { productId } = req.params;

  //----------> delete product
  Product.findOneAndRemove(productId)
    .then((result) => res.redirect("/admin/products"))
    .catch((error) => console.log(error));
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
  Product.findById(productId).then((product) => {
    if (!product) {
      return res.redirect("/admin/products");
    }
    res.render("admin/product-management", {
      product,
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      isEditing: true,
    });
  });
};

//----------> view admin products page
const viewAdminProductsPage = (req, res) => {
  Product.find()
    .then((products) => {
      res.render("admin/products", {
        products,
        path: "/admin/products",
        pageTitle: "Admin Products",
      });
    })
    .catch((error) => console.log(error));
};

module.exports = {
  viewAddProductPage,
  viewEditProductPage,
  addProductToList,
  viewAdminProductsPage,
  editProduct,
  deleteProduct,
};
