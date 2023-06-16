const viewAddProductPage = (req, res) => {
  res.render("add-product", { pageTitle: "Add New Product", path: "/admin/add-product" });
};

module.exports = { viewAddProductPage };
