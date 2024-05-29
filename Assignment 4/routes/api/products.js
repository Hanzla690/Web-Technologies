const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const multer = require("multer");
const upload = multer();

const Product = require("../../models/product");

router.get("/", async (req, res) => {
  let currentPage = req.query.pageNumber;
  let pageSize = 1;
  let count = await Product.countDocuments();
  let products = await Product.find()
    .limit(pageSize)
    .skip((currentPage - 1) * pageSize);
  res.send({ products, count, pageSize });
});

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  let product = await Product.findById(id);
  res.send(product);
});

router.post("/", upload.single("image"), async (req, res) => {
  await fs.promises.writeFile(req.file.originalname, req.file.buffer);

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
    .upload(req.file.originalname, {
      folder: "Assets",
      resource_type: "auto",
    })
    .then(async (result) => {
      let image = {
        publicId: result.public_id,
        url: result.secure_url,
      };
      data.image = image;
      let product = new Product(data);
      await product.save();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(async () => {
      await fs.promises.unlink(req.file.originalname);
    });
  res.render("api-products");
});

router.put("/:id", upload.none(), async (req, res) => {
  let id = req.params.id;
  let product = await Product.findById(id);
  product.title = req.body.title;
  product.price = req.body.price;
  product.description = req.body.description;
  product.category = req.body.category;
  product.tags = JSON.parse(req.body.tags);
  product.specifications = JSON.parse(req.body.specifications);
  await product.save();
  res.send("Product Updated");
});

router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  let product = await Product.findById(id);
  cloudinary.api.delete_resources([product.image.publicId]);
  await Product.deleteOne({ _id: id });
  res.render("api-products");
});

module.exports = router;
