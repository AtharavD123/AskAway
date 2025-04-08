const express = require("express");
const router = express.Router();
const Question = require("Backend/models/Question");

// POST /api/questions - Save question
router.post("/", async (req, res) => {
  try {
    const question = new Question({ text: req.body.text });
    await question.save();
    res.status(201).json({ message: "Question saved" });
  } catch (error) {
    res.status(500).json({ error: "Error saving question" });
  }
});

// GET /api/questions - Get all questions
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching questions" });
  }
});

module.exports = router;
