const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const reportRoutes = require("./routes/reportRoutes");

app.use("/api", reportRoutes);

// middleware
app.use(cors());
app.use(express.json());
app.use("/api", reportRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(5000, () =>
      console.log("Server running on port 5000")
    );
  })
  .catch(err => console.log(err));