const express = require('express');
require("./database");
const rotas = require("./routes");


//iniciando a aplicação
const app = express()

//nas requisições pode ter corpo
app.use(express.json());

//cadastrando as rotas
app.use(rotas);
    

module.exports = app;