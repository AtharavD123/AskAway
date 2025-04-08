const express = require("express");
const router = express.Router();
const User = require("Backend/models/User");

// POST /api/credentials - Save username and password
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: "Credentials saved" });
  } catch (error) {
    res.status(500).json({ error: "Error saving credentials" });
  }
});

module.exports = router;
