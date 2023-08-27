
const socket = io();
const saludar=document.querySelector("#saludar");
const consulta= document.querySelector("#consulta")
const resultado=document.querySelector("#resultado")

socket.on("welcome",data=>{
    const welcome=document.querySelector("#welcome");
    welcome.innerHTML=data;

})

saludar.addEventListener("click",()=>{
socket.emit("server","hola");
})

socket.on("todos",data=>{
    const codigo=document.querySelector("#codigo");
    codigo.innerHTML=data;

})

socket.on("hola",data=>{
    const hola=document.querySelector("#hola");
    hola.innerHTML=data;
    setInterval(()=>{
        hola.innerHTML="";
    }
       
    ,6000)

})

consulta.addEventListener("click",()=>{
    const id=socket.id;
    const data = {
        id:1,
        user:id
    }
    socket.emit("consulta",data);
    })

    socket.on("consultabd",data=>{
                
        async function load() {
            const res = await fetch(`http://localhost:8000/peliculas/+${data.id}`);
      
          
           const datas = await res.json();
        
            if (res.status === 201) {
                console.log("ff");
              socket.emit("reultadoserver",datas)
            }
          }

          load() ;
    })
    socket.on("resultadocliente",data=>{
            console.log(data)
        resultado.innerHTML=data.overview;
    })
    