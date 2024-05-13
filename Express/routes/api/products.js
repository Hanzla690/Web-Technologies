const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const multer = require("multer");
const upload = multer();

const Product = require("../../models/product");

router.get("/display", async (req, res) => {
  res.render("api-products");
});

router.get("/", async (req, res) => {
  let products = await Product.find();
  res.send(products);
});

router.post("/", upload.single("image"), (req, res) => {
  const tempFilePath = `temp_${Date.now()}.png`;
  fs.writeFile(tempFilePath, req.file.buffer, (err) => {
    if (err) {
      console.error("Error saving file to disk:", err);
      return res.status(500).send("Error saving file to disk");
    }
  });

  let data = {
    title: req.body.title,
    price: Number(req.body.price),
    description: req.body.description,
    rating: 0,
    category: req.body.category,
    tags: JSON.parse(req.body.tags),
    specifications: JSON.parse(req.body.specifications),
  };

  cloudinary.uploader
    .upload(tempFilePath, {
      folder: "Assets",
      resource_type: "auto",
    })
    .then(async (result) => {
      data.image = result.secure_url;
      let product = new Product(data);
      await product.save();
    })
    .catch((error) => {
      console.log(error);
    });
  res.render("api-products");
});

router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  await Product.findByIdAndDelete(id);
  res.render("api-products");
});

module.exports = router;
