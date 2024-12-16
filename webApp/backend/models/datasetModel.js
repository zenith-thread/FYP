const mongoose = require("mongoose");

const datasetSchema = new mongoose.Schema({
  name: String,
  features: [Number],
});

module.exports = mongoose.model("Dataset", datasetSchema);
