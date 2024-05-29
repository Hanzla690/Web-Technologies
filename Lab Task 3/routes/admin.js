const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/user");

const {
  checkAdminAuth,
  checkLoginStatus,
} = require("../middlewares/check-admin-auth");

const secret = "secret";

router.get("/", checkAdminAuth, (req, res) => {
  res.render("api-products", {
    scripts: '<script src="/javascript/api-products.js"></script>',
  });
});

router.get("/login", checkLoginStatus, (req, res) => {
  res.render("admin/login", { layout: false });
});

router.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.redirect("/admin/login");
  }

  if (!user.isAdmin) {
    return res.redirect("/admin/login");
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (isPasswordValid) {
    let payload = {
      _id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
    };
    let token = jwt.sign(payload, secret);
    res.cookie("token", token);
    res.redirect("/admin");
  } else {
    res.redirect("/admin/login");
  }
});

router.get("/signup", checkLoginStatus, (req, res) => {
  res.render("admin/signup", { layout: false });
});

router.post("/signup", async (req, res) => {
  let user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  user.isAdmin = true;
  await user.save();
  return res.redirect("/admin/login");
});

router.get("/logout", (req, res) => {
  if (req.cookies.token) {
    res.clearCookie("token");
    return res.redirect("/admin")
  }else{
    return res.redirect("/admin/login")
  }
});

module.exports = router;
