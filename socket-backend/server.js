const express=require("express");
const app=express();
const http=require("http");
const server=http.createServer(app);
const socketIoClient=require("socket.io-client");

const socket=socketIoClient("http://localhost:5001");

socket.on("receiveMessage", (data)=>{
    console.log(data);
    socket.emit("Hooo","Its Working");
});



server.listen(5000,()=>{
    console.log(
        "The backend server is listening to port 5000"
    );
})

