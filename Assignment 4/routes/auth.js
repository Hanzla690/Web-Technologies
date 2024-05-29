const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("auth", {
    scripts: '<script src="/javascript/auth.js"></script>',
  });
});

router.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.redirect("/auth");
  }
  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (isPasswordValid) {
    req.session.user = user;
    res.redirect("/");
  } else {
    res.redirect("/auth");
  }
});

router.post("/logout", (req, res) => {
  req.session.user = null;
  res.redirect("/auth");
});

router.post("/signup", async (req, res) => {
  let user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  await user.save();
  res.redirect("/auth");
});

module.exports = router;
