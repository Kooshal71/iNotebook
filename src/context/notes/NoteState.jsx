import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const s1 = {
    name: "Kushal",
    class: "5D",
  };

  const [state, setState] = useState(s1);
  const update = () => {
    setTimeout(() => {
      setState({
        name: "Wheels",
        class: "OP",
      });
    }, 1000);
  };
  return (
    // <NoteContext.provider value={state}>{props.children}</NoteContext.provider>
    <NoteContext.Provider value={{ state, update }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
