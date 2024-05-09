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

router.get("/:id/add-to-cart", async (req, res) => {
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  let id = req.params.id;
  try {
    let product = await Product.findById(id);
    if (!product) {
      res.redirect("/");
    }
    cart.push(id);
    res.cookie("cart", cart);
    res.send("Added Succesfully");
  } catch {
    res.redirect("/");
  }
});

module.exports = router;
