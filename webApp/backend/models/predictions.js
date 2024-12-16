const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema({
  name: String,
  features: [Number],
  prediction: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Prediction", predictionSchema);
