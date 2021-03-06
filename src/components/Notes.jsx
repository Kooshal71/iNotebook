import React, { useContext, useEffect, useState, useRef } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";
export default function Notes(props) {
  const context = useContext(NoteContext);
  const { Notes, getNotes, editNote } = context;
  const [Note, setNote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "general",
  });

  const closeButton = useRef(null);
  const navigate = useNavigate();
  const getData = (id, title, description, tag) => {
    setNote({ id: id, title: title, description: description, tag: tag });
    console.log(id);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }

    // eslint-disable-next-line
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(Note.id);
    await editNote(Note.id, Note.title, Note.description, Note.tag);
    console.log("Success");
    closeButton.current.click();
    getNotes();
    props.showAlert("success", "The note has been edited");
  };
  const handleChange = (e) => {
    setNote({ ...Note, [e.target.name]: e.target.value });
    console.log(Note.description, Note.tag, Note.title);
  };
  return (
    <>
      <h1 className="my-5">Your Notes</h1>
      {Notes.length === 0 && "No Notes to display"}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
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
                    value={Note.title}
                    required
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
                    type="text"
                    className="form-control"
                    id="tag"
                    name="tag"
                    onChange={handleChange}
                    value={Note.tag}
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    ref={closeButton}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success"
                    onClick={handleSubmit}
                    disabled={
                      Note.title.length < 5 || Note.description.length < 5
                    }
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {Notes.map((note) => {
          return (
            <NoteItem
              note={note}
              key={note._id}
              getId={getData}
              showAlert={props.showAlert}
            />
          );
        })}
      </div>
    </>
  );
}
