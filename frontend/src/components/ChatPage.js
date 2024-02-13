import "../App.css";
import { socket } from "../socket";
import React, { useState } from "react";

function ChatPage({ user, message, sendMessage,setMessage, messages, socket }) {
  const handleClick = () => {
    console.log(message);
    sendMessage();
    socket.emit("message", message);
  };

  return (
    <div className="App">
      <div className="Box">
        {messages.map((item, index) => {
          return item.type === "status" ? (
            <div key={index}>
              {item.userId === user.userId
                ? "You have Joiuned"
                : `${item.username} has joined`}{" "}
            </div>
          ) : (
            <div
              key={index}
              className={
                item.userId === user.userId ? `text-right` : `text-left`
              }
            >
              {item.userId === user.userId
                ? "You"
                : `${item.username} `}{" "}
              <div>{item.message}</div>
            </div>
          );
        })}
      </div>
      <div className="inputF">
        <input
          className="input"
          placeholder="type here...."
          value={message}
          onChange={(e) => setMessage(e.target.value)}

        />
        <button className="button" onClick={handleClick}>
          send
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
