import { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";
import ToastContainer from "./toast/ToastContainer";

const socket = io("http://localhost:5001");

function App() {
  const [message, setMessage] = useState("hi");

 

  const handleClick = () => {
    socket.emit("sendMessage", message);
    
    
  };
 

  return (
    <>
      <div className="socket">
        <h1>Socket Implementation</h1>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleClick}>On Action</button>
      </div>

      <ToastContainer socket={socket} />
    </>
  );
}

export default App;
