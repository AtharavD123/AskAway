const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));  // Serve static files from root

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));

// Schema
const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const Question = mongoose.model("Question", questionSchema);

// API route
app.post("/api/questions", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });

    const newQuestion = new Question({ text });
    await newQuestion.save();

    res.status(201).json({ message: "Question submitted successfully" });
  } catch (err) {
    console.error("Error saving question:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Serve index.html from root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "index.html")); // Use path.resolve
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

