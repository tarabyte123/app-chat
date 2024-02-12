import logo from './logo.svg';
import './App.css';
import { socket } from './socket';
import React, { useState, useEffect } from 'react';


function App() {

  useEffect(() => {
    socket.connect();
    socket.emit("setup", { userId: 1 });

  
    return () => {
      socket.disconnect();
    };
  }, []);


  return (
    <div className="App">
      
    </div>
  );
}

export default App;
