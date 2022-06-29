import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

export default function NoteItem(props) {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, getId } = props;
  return (
    <div className="col-md-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {note.date.slice(0, 10)}
          </h6>
          <p className="card-text">{note.description}</p>
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              // style={{margin:0}
            >
              <i
                className="fa-solid fa-pen-to-square fa-xl text-success"
                onClick={() => {
                  getId(note._id, note.title, note.description, note.tag);
                }}
              ></i>
            </button>
            <button className="btn">
              <i
                className="fa-solid fa-trash fa-xl text-danger"
                onClick={() => {
                  deleteNote(note._id);
                }}
              ></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
