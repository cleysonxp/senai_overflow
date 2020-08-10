const express = require('express');
const rotas = require("./routes");
require("./database");

//iniciando a aplicação
const app = express()

//nas requisições pode ter corpo
app.use(express.json());

//cadastrando as rotas
app.use(rotas);
    

module.exports = app;