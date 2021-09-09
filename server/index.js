const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server , {
    cors : {
        origin : "http://localhost:3000",
        methods : ["GET", "POST"]
    }
})

const users = [];

function userCheck(username) {
    const index = users.findIndex(user => user.username === username);
  
    if (index !== -1) {
      return users.splice(index, 1)[0];
    }
  }
  


io.on("connection", socket => {
    console.log(`New User Connection : ${socket.id}`);
    socket.emit("me", socket.id);
    socket.on("addUser", data => {
        userCheck(data.username);
        users.push({username : data.username , id : socket.id })
        console.log(users);
        io.emit("usersOnline", {users : users})
    })
    socket.on("sendMessage", (data) => {
        const user = users.find(user =>  user.username === data.username)
        console.log(user)
        if(user !== undefined){
            socket.to(user.id).emit("receiveMessage", {message : data.message , username : data.from})
            console.log(`message send ${user.username}`)
        }else{
            console.log("User Not Connected");
            socket.emit("errorMessage",{message : "User not found"} )
        }
    })
})

server.listen(5000, () => console.log("Listening on port 5000" ))