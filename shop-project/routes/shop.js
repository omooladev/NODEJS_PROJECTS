//? import statements
const express = require("express");
const { getAllProducts } = require("../controllers/user");

const router = express.Router();

router.get("/", getAllProducts);

module.exports = router;
