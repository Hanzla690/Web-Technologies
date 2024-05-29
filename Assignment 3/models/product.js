const mongoose = require("mongoose");

let productSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    image: {},
    rating: Number,
    category: String,
    tags: [String],
    specifications: {},
  },
  { versionKey: false },
  { timestamps: true }
);

let Product = mongoose.model("Product", productSchema);

module.exports = Product;
