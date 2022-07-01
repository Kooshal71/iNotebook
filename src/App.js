import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    console.log(type, message);
    setAlert({ type: type, message: message });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <Alert message={alert} />
        <div className="container">
          <Routes>
            <Route
              exact
              path="/"
              element={<Home showAlert={showAlert} />}
            ></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route
              exact
              path="/login"
              element={<Login showAlert={showAlert} />}
            ></Route>
            <Route
              exact
              path="/signup"
              element={<SignUp showAlert={showAlert} />}
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
