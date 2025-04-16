import {Server} from "socket.io"
import http from "http"
import express from "express"

const app = express();
const server = http.createServer(app);

const io = new Server(server , {
    cors: {
        origin: ["http://localhost:5173"]
    }
})

export function getRecieverSocketId(userId) {
    return userSocketMap[userId]
}
// online user stored here
const userSocketMap = {}; 

io.on("connection" , (socket) => {
    console.log("A user connected " ,socket.id);

    const userId = socket.handshake.query.userId;  // jo userId react app bhej raha hai , query krke , usse interact krne ke liye handshake ka code likhte hai
    if(userId) userSocketMap[userId] = socket.id  // userId ko socketId se map kar diya to know the online users if needed using socketMap

    io.emit("getOnlineUsers" , Object.keys(userSocketMap))  // ye emit krra hai , ek tarah se bhej raha hai , aur react app sunega ise aur userIds store karlega 
    socket.on("disconnect" , () => { // When the user logs Out from the react app , then the socket disconnects that user and deletes the user from the online user ki list ie the socketMap
        console.log("A user is disconnected" , socket.id)
        delete userSocketMap[userId];
        io.emit("getOnlineUsers" , Object.keys(userSocketMap))
    })
})

export {io , app , server}