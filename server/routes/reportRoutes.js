const express = require("express");
const router = express.Router();
const Report = require("../models/report");

// POST: Add unsafe location
router.post("/report", async (req, res) => {
  try {
    const { latitude, longitude, description } = req.body;

    const report = new Report({ latitude, longitude, description });
    await report.save();

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: Get all reports
router.get("/reports", async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;