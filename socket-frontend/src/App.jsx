import { useState } from 'react';

import './App.css';
import io from "socket.io-client";

const socket=io("http://localhost:5001") ;

function App() {
  const [message, setMessage] = useState("hi");

  const handleclick=()=>{
    socket.emit("sendMessage",message);
    socket.on("Hoo",(data)=>{
      alert(data);
    })
    
    // socket.on("receiveMessage",(data)=>{
    //   console.log(`${data} is the received data `);
    // });
  }

  return (
    <>
    <div className='socket'>
    <h1>Socket Implementation</h1>
    <input type='text' value={message} onChange={(e)=>{
      setMessage(e.target.value);
    }}  />
    <button onClick={handleclick}>On Action</button>

    </div>
     
    </>
  );
};

export default App
