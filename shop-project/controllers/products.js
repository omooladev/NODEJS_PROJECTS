const viewAddProductPage = (req, res) => {
  res.render("add-product", { pageTitle: "Add New Product", path: "/admin/add-product" });
};

const addProductToList = (req, res) => {
  console.log(req.body);
  console.log(req.files.productImage);
  console.log("me");
};

module.exports = { viewAddProductPage, addProductToList };
