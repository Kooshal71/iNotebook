import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

export default function AddNote(props) {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [Note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(Note.title, Note.description, Note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("success", "The note has been added");
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
            required
            value={Note.title}
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
            value={Note.description}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            value={Note.tag}
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={handleChange}
            required
          />
        </div>
        <button
          //   type="submit"
          className="btn btn-primary btn-xl"
          onClick={handleSubmit}
          disabled={Note.title.length < 5 || Note.description.length < 5}
        >
          Add Note
        </button>
      </form>
    </div>
  );
}
