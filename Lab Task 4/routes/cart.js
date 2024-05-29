const express = require("express");
const router = express.Router();

const Product = require("../models/product");

router.get("/", async (req, res) => {
  let cart = req.cookies.cart;
  let total = 0;
  if (!cart) cart = [];

  const productIds = cart.map((item) => item.id);

  let products = await Product.find({ _id: { $in: productIds } });

  products = products.map((product) => {
    const cartItem = cart.find((item) => item.id === product._id.toString());
    return {
      ...product.toObject(),
      quantity: cartItem.quantity,
    };
  });

  products.forEach((product) => {
    total += product.price * product.quantity;
  });
  res.render("cart", { products, total });
});

router.get("/remove/:id", (req, res) => {
  let id = req.params.id;
  let cart = req.cookies.cart;
  if (!cart) {
    return res.redirect("/cart");
  }
  cart.forEach((item) => {
    if (item.id == id) {
      cart.splice(cart.indexOf(item), 1);
    }
  });
  res.cookie("cart", cart);

  res.redirect("/cart");
});

router.post("/", (req, res) => {
  let products = req.body.products;
  let cart = req.cookies.cart;
  if (!cart) {
    res.redirect("/cart");
  }

  cart.forEach((item) => {
    let cartItem = products.find((product) => product.id === item.id);

    if (cartItem) {
      item.quantity = Number(cartItem.quantity);
    }
  });
  res.cookie("cart", cart);
  res.redirect("/cart");
});

module.exports = router;
