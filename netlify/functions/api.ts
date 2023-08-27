import express, { Router } from 'express';
import serverless from 'serverless-http';

const { createServer } = require("http");
const { Server } = require("socket.io");

const path = require("path");
const { Socket } = require("dgram");
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const api = express();
app.use( express.static(path.join(__dirname,"/src/views")))
const router = Router();
router.get('/hello',(req,res)=>{
    res.sendFile(path.join(__dirname,"/src/views/index.html"));
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

api.use('/api', router);

export const handler = serverless(api);