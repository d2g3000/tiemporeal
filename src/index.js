const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const path = require("path");
const { Socket } = require("dgram");
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use( express.static(path.join(__dirname,"views")))

app.get("/",(req,res)=>{
    return res.json({hello: 'dog'});
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
})

httpServer.listen(3005);