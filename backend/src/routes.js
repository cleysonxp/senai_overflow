

const express = require("express");
const { route } = require("./app");

//criando o roterizador
const routes = express.Router();

const alunoController = require("./controllers/aluno");
const postagemController = require("./controllers/postagem");
const comentarioController = require("./controllers/comentario");
const sessaoController = require("./controllers/sessao");

// Rota publica
routes.post("/sessao", sessaoController.store);


//Rotas de usuarios
routes.get("/alunos", alunoController.listar);
routes.get("/alunos/:id", alunoController.buscarPorId);
routes.post("/alunos", alunoController.store);

//Rotas de postagem
routes.post("/postagens", postagemController.store);
routes.delete("/postagens/:id", postagemController.delete);
routes.get("/postagens", postagemController.index);

//rotas de comentarios
routes.get("/postagens/:postId/comentarios", comentarioController.index);
routes.post("/postagens/:postId/comentarios", comentarioController.store);

module.exports = routes;