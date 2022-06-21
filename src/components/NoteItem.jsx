import React from "react";
export default function NoteItem(props) {
  const { note } = props;
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
            <a href="/" className="card-link text-success">
              <i className="fa-solid fa-pen-to-square fa-xl"></i>
            </a>
            <a href="/" className="card-link text-danger">
              <i className="fa-solid fa-trash fa-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
