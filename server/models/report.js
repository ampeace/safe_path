const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Report", reportSchema);