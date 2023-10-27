const express = require("express");
const app = express();
const port = 3000;

// GET POST 

app.get("/", (req, res)=> {
    res.send ("<h1> Bienvenido a mi servidor </h1>")
});

app.get("/listado", (req, res)=> {
    res.json(personas)
});

app.get("listado/:id", (req, res)=> {
    res.json(personas[req.params.id])
});

app.listen(port,()=>{
console.log("Servidor funcionando.")
});