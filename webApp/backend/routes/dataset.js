const express = require("express");
const Dataset = require("../models/datasetModel");
const XLSX = require("xlsx");
const router = express.Router();

// Fetch sample dataset
router.get("/", async (req, res) => {
  const data = await Dataset.find({});
  res.json(data);
});

// Download dataset as Excel
router.get("/download", async (req, res) => {
  const data = await Dataset.find({});
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data.map((doc) => doc.toObject()));
  XLSX.utils.book_append_sheet(workbook, worksheet, "Dataset");

  const filePath = "./uploads/sample_dataset.xlsx";
  XLSX.writeFile(workbook, filePath);
  res.download(filePath);
});

module.exports = router;
