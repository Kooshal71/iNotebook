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

//! ROUTE3: Updating an existing note "api/notes/updatenote"

router.put("/updatenote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  // Creating a new note
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  // Checks if the note exists
  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Note not found");
  }
  //? Checks if the same user is trying to access to note
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }
  // Finds the note which needs to be updated
  note = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
    // req.params.id is the id of the note; req.user.id is the id of the user tring to access the note; note.user is the id of the user who created the note
  );
  res.json({ note });
});

//! ROUTE4: Deleting an existing note "api/notes/deletenote"

router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  // Checks if the note exists
  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Note not found");
  }
  //? Checks if the same user is trying to access to note
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }
  // Finds the note which needs to be deleted
  note = await Notes.findByIdAndDelete(req.params.id);
  // req.params.id is the id of the note; req.user.id is the id of the user tring to access the note; note.user is the id of the user who created the note
  res.json({ Success: "The note has been deleted", note: note });
});

module.exports = router;
