import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [Notes, setNotes] = useState(notesInitial);

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhZGI3MDY1Mzg5MTQzMDRlMTMwZmVlIn0sImlhdCI6MTY1NTU1MjgwM30.zSWuW2fSXzE-0irWOlHQds6sjX6Q9k6F5wY2G_U3FEY",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhZGI3MDY1Mzg5MTQzMDRlMTMwZmVlIn0sImlhdCI6MTY1NTU1MjgwM30.zSWuW2fSXzE-0irWOlHQds6sjX6Q9k6F5wY2G_U3FEY",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();

    // note = null;
    console.log("We have entered the function");
    const note = {
      _id: "62aec32273329a0e42f0a4ac",
      user: "62adb706538914304e130fee",
      title: title,
      description: description,
      tag: tag,
      date: "2022-06-19T06:33:06.118Z",
      __v: 0,
    };
    console.log(title, description, tag);
    setNotes(Notes.concat(note));
  };

  // Delete a note
  const deleteNote = (id) => {
    console.log("Deleting note with id:", id);
    const newNotes = Notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // edit a note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhZGI3MDY1Mzg5MTQzMDRlMTMwZmVlIn0sImlhdCI6MTY1NTU1MjgwM30.zSWuW2fSXzE-0irWOlHQds6sjX6Q9k6F5wY2G_U3FEY",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    for (let index = 0; index < Notes.length; index++) {
      const element = Notes[index];
      if (element._id === id) {
        element.tag = tag;
        element.title = title;
        element.description = description;
      }
    }
  };
  return (
    // <NoteContext.provider value={state}>{props.children}</NoteContext.provider>
    <NoteContext.Provider
      value={{ Notes, setNotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
