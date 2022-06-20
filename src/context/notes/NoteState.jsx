import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const notes = [
    {
      _id: "62adc5981d5323278eeeb0f6",
      user: "62adb706538914304e130fee",
      title: "First Note",
      description: "Must complete the course",
      tag: "personal",
      date: "2022-06-18T12:31:20.716Z",
      __v: 0,
    },
    {
      _id: "62aec32273329a0e42f0a4ac",
      user: "62adb706538914304e130fee",
      title: "Second Note",
      description: "Must complete the course quickly",
      tag: "personal",
      date: "2022-06-19T06:33:06.118Z",
      __v: 0,
    },
  ];

  const [Notes, setNotes] = useState([]);

  return (
    // <NoteContext.provider value={state}>{props.children}</NoteContext.provider>
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
