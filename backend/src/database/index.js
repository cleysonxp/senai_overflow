const Sequelize = require('sequelize');
const dbConfig = require("../config/database");

const Aluno = require("../models/Aluno");
const Postagem = require("../models/Postagem");
const Comentario = require("../models/Comentario");

//Criamos conexoa com os dados da configuração
const conexao = new Sequelize(dbConfig);

//Iniciando os models
Aluno.init(conexao);
Postagem.init(conexao);
Comentario.init(conexao);

//Inicializando as associações
Aluno.associate(conexao.models);
Postagem.associate(conexao.models);
Comentario.associate(conexao.models); 

//Exportando a conexão
module.exports = conexao;
