const Sequelize = require('sequelize');
const dbConfig = require("../config/database");

const Aluno = require("../models/Aluno")

//Criamos conexoa com os dados da configuração
const conexao = new Sequelize(dbConfig);

Aluno.init(conexao);

//Exportando a conexão
module.exports = conexao;