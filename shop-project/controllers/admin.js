const Product = require("../models/product");

const addProductToList = (req, res) => {
  const { name, price, description, transformedImage: imageUrl } = req.body;
  //const { image } = req.files || "";

  if (!name || !price || !description || !imageUrl) {
    return res.status(400).json({ message: "Please provide values for all the fields" });
  }

  if (description.trim().length > 500) {
    return res.status(400).json({ message: "Products description cannot exceed 500 characters" });
  }
  //----------> create a new product
  const product = new Product(name, price, description, imageUrl);

  //----------> save the product
  product
    .save()
    .then((response) => {
      const { success, message } = response;
      if (success === true) {
        res.status(201).json({ message });
      } else {
        res.status(400).json({ message });
      }
    })
    .catch((error) => console.log(error));
};

const editProduct = (req, res) => {
  const { productId } = req.params;
  const { name, price, description, transformedImage: imageUrl } = req.body;
  const { image } = req.files || "";

  if (!name || !price || !description || !imageUrl) {
    return res.status(400).json({ message: "Please provide values for all the fields" });
  }

  if (description.trim().length > 500) {
    return res.status(400).json({ message: "Products description cannot exceed 500 characters" });
  }
  const product = { name, price, description, imageUrl };
  Product.updateById(productId, product, ({ success, message }) => {
    if (success === true) {
      return res.status(201).json({ message });
    }
    return res.status(400).json({ message });
  });
};

const deleteProduct = (req, res) => {
  //----------> get product id
  const { productId } = req.params;

  //----------> delete product
  Product.delete(productId)
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
  Product.findById(productId, (product) => {
    if (!product) {
      res.redirect("/admin/products");
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
  Product.fetchAll()
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
