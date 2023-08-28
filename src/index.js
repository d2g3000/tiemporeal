const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const {Router}=require('express');
const path = require("path");
const { Socket } = require("dgram");
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const api =express();

app.use( express.static(path.join(__dirname,"views")))
const router = Router();
router.get("/",(req,res)=>{
    res.sendFile(__dirname+"/views/index.html");
});
io.on("connection",Socket=>{
    Socket.emit("welcome","ahora estas conectado");
    io.emit("todos","tu id es"+Socket.id);

    Socket.on("server",data=>{
       if(data=="hola"){
        io.emit("hola","hola a todos");
       }
    })

    Socket.on("consulta",data=>{
        Socket.emit("consultabd",data);
    })

    Socket.on("reultadoserver",data=>{
        Socket.emit("resultadocliente",data);
    })

   // Emisión a uno solo
   socket.on("last", message => {

    const lastSocket = socketsOnline[ socketsOnline.length - 1 ];
    io.to(lastSocket).emit("salute", message);

})

// on, once, off
/* socket.emit("on", "holi");
socket.emit("on", "holi"); */

/* socket.emit("once", "holi");
socket.emit("once", "holi"); */

socket.emit("off", "holi");

setTimeout(() => {
    socket.emit("off", "holi");
}, 3000);

})
api.use('/api/', router);
httpServer.listen(3005);