const express = require("express");
const axios = require("axios");
const Prediction = require("../models/predictions");
const router = express.Router();

// Predict and save results
router.post("/", async (req, res) => {
  const { name, features } = req.body;

  try {
    // Send data to Python Flask API
    const response = await axios.post("http://127.0.0.1:5000/predict", {
      features,
    });

    const prediction = response.data.prediction;

    // Save the result in MongoDB
    const newPrediction = new Prediction({ name, features, prediction });
    await newPrediction.save();

    res.json({ message: "Prediction successful", prediction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Prediction failed" });
  }
});

// Fetch all predictions
router.get("/", async (req, res) => {
  const predictions = await Prediction.find({});
  res.json(predictions);
});

// Download predictions as Excel
router.get("/download", async (req, res) => {
  const predictions = await Prediction.find({});
  const XLSX = require("xlsx");
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(
    predictions.map((doc) => doc.toObject())
  );
  XLSX.utils.book_append_sheet(workbook, worksheet, "Predictions");

  const filePath = "./uploads/predictions.xlsx";
  XLSX.writeFile(workbook, filePath);
  res.download(filePath);
});

module.exports = router;
