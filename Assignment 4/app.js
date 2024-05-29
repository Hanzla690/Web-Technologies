const express = require("express");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const cookieParser = require("cookie-parser");
const multer = require("multer");
const ejsLayouts = require("express-ejs-layouts");
const expressSession = require("express-session");

const Product = require("./models/product");

const productsRoute = require("./routes/products");
const cartRoute = require("./routes/cart");
const authRoute = require("./routes/auth");
const adminRoute = require("./routes/admin");
const apiRoute = require("./routes/api/products");

const { checkCartCount } = require("./middlewares/cart-count");
const { checkAuth } = require("./middlewares/check-auth");

let app = express();
mongoose.connect("mongodb://localhost:27017/TechZone");

cloudinary.config({
  cloud_name: "dzysnq4zn",
  api_key: "169878511253832",
  api_secret: "sOuHuXYGVEuCY8AYpEWTcnLaA0g",
});

const upload = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({ secret: "Secret", resave: false, saveUninitialized: false })
);
app.use(cookieParser());
app.use(ejsLayouts);
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(checkCartCount);
app.use("/products", productsRoute);
app.use("/cart", cartRoute);
app.use("/auth", authRoute);
app.use("/admin", adminRoute);
app.use("/api/products", apiRoute);

app.get("/", async (req, res) => {
  let products = await Product.find();
  res.render("index", { products: products });
});

app.get("/contact-us", (req, res) => {
  res.render("contact");
});

app.get("/stories", (req, res) => {
  res.render("stories", {
    scripts: '<script src="/javascript/CRUD.js"></script>',
  });
});

app.get("/wishlist", checkAuth, (req, res) => {
  res.render("wishlist");
});

app.listen("4000");
