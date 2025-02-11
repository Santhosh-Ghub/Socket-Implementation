const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const server = http.createServer();

server.on(
  "request",
  cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5174",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let client1 = null;
let client2 = null;

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  // Assign the first two clients
  if (!client1) {
    client1 = socket.id;
    console.log(`Client 1 assigned: ${client1}`);
  } else if (!client2 && socket.id !== client1) {
    client2 = socket.id;
    console.log(`Client 2 assigned: ${client2}`);
  }

  socket.on("sendMessage", (data) => {
    console.log(`Message from ${socket.id}: ${data}`);

    let targetClient = null;

    // Determine the target client
    if (socket.id === client1) {
      targetClient = client2;
    } else if (socket.id === client2) {
      targetClient = client1;
    }

    if (targetClient) {
    
     if(targetClient===client1){
        setTimeout(() => {
            io.to(client2).emit("paymentCompleted", "Payment Completed");
          }, 6000);       
    }else{
        setTimeout(() => {
            io.to(client1).emit("paymentCompleted", "Payment Completed");
          }, 6000);
     }
      io.to(targetClient).emit("receiveMessage", data);
      console.log(`Forwarded ${data} to ${targetClient}`);
    } else {
      console.log("No target client available to forward the message.");
    }

    // Emit "payment initiated" immediately
    socket.emit("payment initiated", "The payment initiated on processing");

    // Wait 6 seconds before emitting "payment received"
    
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
    if (socket.id === client1) {
      client1 = null;
    } else if (socket.id === client2) {
      client2 = null;
    }
  });
});

server.listen(5001, () => {
  console.log("The Socket server is listening on port 5001");
});
