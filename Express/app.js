const express = require("express");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

const Product = require("./models/product");

const productsRoute = require("./routes/products");

let app = express();
mongoose.connect("mongodb://localhost:27017/TechZone");

cloudinary.config({
  cloud_name: "dzysnq4zn",
  api_key: "169878511253832",
  api_secret: "sOuHuXYGVEuCY8AYpEWTcnLaA0g",
});

app.listen("4000");

app.use("/products", productsRoute);

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  let products = await Product.find();
  res.render("index", { products: products });
});

app.get("/contact-us", (req, res) => {
  res.render("contact");
});

app.get("/stories", (req, res) => {
  res.render("stories");
});

app.get("/wishlist", (req, res) => {
  res.render("wishlist");
});

app.get("/cart", (req, res) => {
  res.render("cart");
});

app.get("/image", (req, res) => {
  cloudinary.uploader
    .upload("./public/assets/card-image.png", {
      folder: "Assets",
      use_filename: true,
    })
    .then((result) => {
      console.log(result);
    });
  res.redirect("/");
});
