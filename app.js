const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

// Create an HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = socketio(server);

// Set EJS as the view engine
app.set("view engine", "ejs");

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Handle Socket.IO connections
io.on("connection", (socket) => {
    socket.on("send-location",function(data){
        io.emit("recieved-location",{id : socket.id, ...data});
    });
    // console.log("A user connected");
    socket.on("disconnect",function(){
        io.emit("user-disconnected",socket.id);
    })
});

// Define the route for the home page
app.get("/", (req, res) => {
    res.render("index");
});

// Start the server and listen on port 3000
server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
