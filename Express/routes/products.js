const express = require("express");
const router = express.Router();

const Product = require("../models/product");

router.get("/", async (req, res) => {
  let products = await Product.find();
  res.render("products", { products: products });
});

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let product = await Product.findById(id);
    if (!product) {
      res.redirect("/");
    }
    res.render("product-details", { product: product });
  } catch {
    res.redirect("/");
  }
});

module.exports = router;
