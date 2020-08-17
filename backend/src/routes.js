

const express = require("express");
const { route } = require("./app");

//criando o roterizador
const routes = express.Router();

const autorizacaoMid = require("./middlewares/autorizacao");

const alunoController = require("./controllers/aluno");
const postagemController = require("./controllers/postagem");
const comentarioController = require("./controllers/comentario");
const sessaoController = require("./controllers/sessao");

// Rota publica
routes.post("/sessao", sessaoController.store);
routes.post("/alunos", alunoController.store);

//middleware de proterção das rotas
routes.use(autorizacaoMid);


//Rotas de usuarios
routes.get("/alunos", alunoController.listar);
routes.get("/alunos/:id", alunoController.buscarPorId);


//Rotas de postagem
routes.post("/postagens", postagemController.store);
routes.delete("/postagens/:id", postagemController.delete);
routes.get("/postagens", postagemController.index);

//rotas de comentarios
routes.get("/postagens/:postId/comentarios", comentarioController.index);
routes.post("/postagens/:postId/comentarios", comentarioController.store);

module.exports = routes;