const express = require('express');
const cors = require("cors")
require("./database");
const rotas = require("./routes");


//iniciando a aplicação
const app = express()

//habilitando o cors para qualquer origem
app.use(cors())

//nas requisições pode ter corpo
app.use(express.json());

//cadastrando as rotas
app.use(rotas);
    

module.exports = app;