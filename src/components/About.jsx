import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/NoteContext";

export default function About() {
  const a = useContext(noteContext);
  useEffect(() => {
    a.update();
  });

  return (
    <div>
      <h1>About Page</h1>
      <p>
        This is the about page and the functionalities as well as the details of
        the project
        <br />
        Developed by - {a.state.name} from class {a.state.class}
      </p>
    </div>
  );
}
