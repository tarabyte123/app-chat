import "./App.css";
import React, { useEffect, useState } from "react";
import ChatPage from "./components/ChatPage";
import { socket } from "./socket";
import { Joinuser } from "../src/components/joinUser";

function App() {
  const [newuser, setnewUser] = useState();
  const [user, setUser] = useState({});
  const [users, setUsers] = useState();
  const [message, setMessage] = useState();
  const [messages, setMessages] = useState([]);

  console.log(messages)

  const handleClick = () => {
    setUser(newuser);
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


    socket.on("newmessage", ({ message, userId, username }) => {
      const newMessage = {
        type: "message",
        userId: userId,
        username: username,
        message,
      };

      setMessages([...messages, newMessage]);
    });


  }, []);

  function sendMessage() {
    socket.emit("newmessage", message);
    const newMessage = {
      type: "message",
      userId: user.userId,
      username: user.username,
      message,
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  }

  return (
    <div className="App">
      {user.userId && (
        <ChatPage
          user={user}
          message={message}
          sendMessage={sendMessage}
          setMessage={setMessage}
          socket={socket}
          messages={messages}
        />
      )}
     <Joinuser user={user} handleClick={handleClick} setnewUser={setnewUser} newuser={newuser}/>
    </div>
  );
}

export default App;
