import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";

export default function Notes() {
  const context = useContext(NoteContext);
  const { notes, setNotes } = context;
  return (
    <>
      <h1 className="my-5">Your Notes</h1>
      <div className="row">
        {notes.map((note) => {
          return <NoteItem note={note} />;
        })}
      </div>
    </>
  );
}
