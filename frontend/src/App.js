import logo from "./logo.svg";
import "./App.css";
import { socket } from "./socket";
import React, { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState();

  useEffect(() => {
    socket.connect();
    socket.on("all-people", (msg) => {
      const p = document.createElement("p");
      p.innerText = msg;
      const sel = document.getElementById("head");
      sel.appendChild(p);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleClick = () => {
    console.log(message);
    socket.emit("message", message);
  };

  return (
    <div className="App">
      <div className="Box">
        <h1 className="head"></h1>
      </div>
      <div className="inputF">
        <input
          className="input"
          placeholder="type here...."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="button" onClick={handleClick}>
          send
        </button>
      </div>
    </div>
  );
}

export default App;
