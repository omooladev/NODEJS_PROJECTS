//? import statements
const express = require("express");

const router = express.Router();

router.post("/add-product", (req, res) => {
  res.send("Products sent");
});

module.exports = router;
