//? import statements
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("shop", { pageTitle: "Shop", path: "/" });
});

module.exports = router;
