const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  price: Number,
  dateOfSale: Date,
  sold: Boolean,
  image: String,
  category: String,
});

module.exports = mongoose.model("Transaction", transactionSchema);
