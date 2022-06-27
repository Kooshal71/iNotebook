import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

export default function AddNote() {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [Note, setNote] = useState({
    title: "",
    description: "",
    tag: "general",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(Note.title, Note.description, Note.tag);
  };
  const handleChange = (e) => {
    setNote({ ...Note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h1 className="my-5">Add a Note</h1>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={handleChange}
          />
        </div>
        <button
          //   type="submit"
          className="btn btn-primary btn-xl"
          onClick={handleSubmit}
        >
          Add Note
        </button>
      </form>
    </div>
  );
}
