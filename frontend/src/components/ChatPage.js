import "../App.css";
import { socket } from "../socket";
import React, { useState } from "react";

function ChatPage({
  user,
  message,
  sendMessage,
  setMessage,
  messages,
  socket,
}) {
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
              <div className="">
                <div>
                  {item.userId === user.userId ? "You" : `${item.username}`}{" "}
                </div>
                <div className="message">{item.message}</div>
              </div>
              <img
                src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
                height={40}
                width={40}
                alt="image"
                style={{
                  display: "inline-grid",
                  borderRadius: "10px",
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="input-chat-box">
        <input
          placeholder="type here...."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUpCapture={(e) => (e.code === "Enter" ? handleClick() : null)}
        />
        <button className="chat-send-button" onClick={handleClick}>
          send
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
