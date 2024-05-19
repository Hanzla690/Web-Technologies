const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  console.log(req.body);
  res.redirect("/auth");
});

router.post("/signup", (req, res) => {
  console.log(req.body);
  res.redirect("/auth");
});

module.exports = router;
