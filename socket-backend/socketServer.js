const http=require("http");
const socketIo=require("socket.io");
const cors=require('cors');
const socketIoClient=require("socket.io-client");


const server=http.createServer();
 

server.on('request',cors({  origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
    credentials: true,}));

const io=socketIo(server,{cors:{
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
    credentials: true,
}});
const backendSocket=socketIoClient("http://localhost:5000");

io.on("connection", (socket)=>{
    console.log("Socket conneted with a client");
    console.log(socket.id);

    socket.on("sendMessage", (data)=>{
        
        console.log(`A message from client : ${data}`);
        socket.emit("Hoo", `Message received: ${data}`);
    });
    backendSocket.on('Hoo',(message)=>{
        socket.emit('Hoo',message);
    });

    


});


server.listen(5001,()=>{
    console.log("The Socket server is listening to port 5001");
});