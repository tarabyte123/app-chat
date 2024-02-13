import React, { useEffect, useState } from "react";
import ChatPage from "./ChatPage";
import { socket } from "../socket";
import { Joinuser } from "./joinUser";

export function Main() {
  const [newuser, setnewUser] = useState();
  const [user, setUser] = useState({});
  const [users, setUsers] = useState();
  const [message, setMessage] = useState();
  const [messages, setMessages] = useState([]);

  const handleChange = () => {
    socket.auth = { username: newuser };
    socket.connect();
  };

  useEffect(() => {
    socket.on("session", ({ username, userId }) => {
      setUser({ userId, username });
    });

    socket.on("users", (users) => {
      const messageArr = [];

      for (const { userId, username } of users) {
        const newMessage = { type: "status", userId, username };
        messageArr.push(newMessage);
      }

      setMessages([...messages, ...messageArr]);
      setUsers(users);
    });

    socket.on("userconnected", ({ userId, username }) => {
      const newMessage = { type: "status", userId, username };
      setMessages([...messages, newMessage]);
    });

    socket.on("all-message", ({ message, userId, username }) => {
      const newMessage = {
        type: "message",
        userId: userId,
        username: username,
        message,
      };
      setMessages([...messages, newMessage]);
    });
  }, [socket]);


  return (
    <>
      {user.userId && (
        <ChatPage
          user={user}
          message={message}
          setMessage={setMessage}
          socket={socket}
          setMessages={setMessages}
          messages={messages}
          setUsers={setUsers}
          setUser={setUser}
        />
      )}
      {!user.userId && (
        <Joinuser
          user={user}
          setnewUser={setnewUser}
          newuser={newuser}
          handleChange={handleChange}
        />
      )}
    </>
  );
}
