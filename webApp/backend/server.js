const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/mongodb");
const datasetRoutes = require("./routes/dataset");
const predictRoutes = require("./routes/predict");
const manualInputRoutes = require("./routes/manualInput");

const app = express();
app.use(bodyParser.json());
app.use(express.static("uploads")); // Serve uploaded files

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/dataset", datasetRoutes);
app.use("/api/predict", predictRoutes);
app.use("/api/manual", manualInputRoutes);

// Start Server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
