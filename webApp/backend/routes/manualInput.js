const express = require("express");
const multer = require("multer");
const XLSX = require("xlsx");
const axios = require("axios");
const router = express.Router();

// File upload configuration
const upload = multer({ dest: "uploads/" });

// Handle CSV Upload
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const results = [];

    for (let row of data) {
      const features = Object.values(row);
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        features,
      });
      results.push({ input: row, prediction: response.data.prediction });
    }

    res.json({ message: "Predictions complete", results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "CSV processing failed" });
  }
});

module.exports = router;
