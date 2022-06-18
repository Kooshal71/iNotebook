const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//! ROUTE1: Get all the notes from "api/notes/fetchallnotes"
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

//! ROUTE2: ADD NOTES OF THE USER FROM "api/notes/addnotes"
router.post(
  "/addnotes",
  fetchUser,
  body("title", "Enter a title").exists(),
  body("description", "Must be at least 5 characters").isLength({ min: 5 }),
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      }
      //   Create a new note
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server side issue");
    }
  }
);

module.exports = router;
