const express = require("express");

const productsRoute = require("./routes/products");

let app = express();

app.listen("4000");

app.use("/products", productsRoute);

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
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
