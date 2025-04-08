require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Schema and model
const questionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Question = mongoose.model("Question", questionSchema);

// API Route
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

// Serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Optional: 404 fallback
app.use((req, res) => {
    res.status(404).send("404 Not Found");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
