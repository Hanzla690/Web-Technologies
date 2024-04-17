const express = require("express");
const User = require("/Web Practice/Express/models/user");
const router = express.Router();

router.use(express.json());

router.get("/", async (req, res) => {
  let users = await User.find();
  res.send(users);
});

router.get("/:id", async (req, res) => {
  let user = await User.findById(req.params.id);
  res.send(user);
});

router.put("/:id", async (req, res) => {
  let user = await User.findById(req.params.id);
  user.username = req.body.username
  user.email = req.body.email
  user.age = req.body.age
  await user.save()
  res.send(user);
});

router.delete("/:id", async (req, res) => {
  let user = await User.findByIdAndDelete(req.params.id);
  res.send(user);
});

router.post("/", async (req, res) => {
  let data = req.body;
  let user = new User(data);
  await user.save();
  res.send(user);
});

module.exports = router;
