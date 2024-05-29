const express = require("express");
const router = express.Router();

const Product = require("../models/product");

router.get("/", async (req, res) => {
  let currentPage = req.query.pageNumber ? req.query.pageNumber : 1;
  let pageSize = 1;
  let count = await Product.countDocuments();
  let totalPages = Math.ceil(count / pageSize);
  let products = await Product.find()
    .limit(pageSize)
    .skip((currentPage - 1) * pageSize);
  res.render("products", { products, totalPages });
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
  let quantity = 1;
  let found = false;
  try {
    let product = await Product.findById(id);
    if (!product) {
      res.redirect("/");
    }

    cart.forEach((item) => {
      if (item.id == product.id) {
        item.quantity += 1;
        found = true;
      }
    });

    if (!found) {
      cart.push({
        id: id,
        quantity: quantity,
      });
    }
    res.cookie("cart", cart);
    res.send("added")
  } catch {
    res.redirect("/");
  }
});

module.exports = router;
