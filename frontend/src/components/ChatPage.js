import "../App.css";
import { socket } from "../socket";
import React, { useState } from "react";

function ChatPage({ user, message, sendMessage,setMessage, messages, socket }) {
  const handleClick = () => {
    sendMessage();
  };

  return (
    <div className="container">
      <div className="box">
        {messages.map((item, index) => {
          return item.type === "status" ? (
            <div key={index} className="joined-status">
              {item.userId === user.userId
                ? "You have Joined"
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
                : `${item.username}`}{" "}
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
