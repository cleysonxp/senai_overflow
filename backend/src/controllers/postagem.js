const Postagem = require("../models/Postagem");
const Aluno = require("../models/Aluno");

module.exports = {

    async index(req, res){
        const postagens = await Postagem.findAll({
            include:{
                association: "Aluno",
                attributes: ["id", "nome", "ra"],
            },
            order: [["created_at", "DESC"]],
        });

        res.send(postagens);
    },


    async store(req, res){
        const created_aluno_id = req.alunoId;

        const {titulo, descricao, imagem, gists } = req.body;
        
        try {
            const aluno = await Aluno.findByPk(created_aluno_id);

            if(!aluno){
                res.status(404).send({erro: " Aluno não encontrado"});
            }

            let post = await aluno.createPostagem({
                titulo, 
                descricao,
                imagem, 
                gists,
            });
    
            res.status(201).send(post);
        } catch (error) {
            return res.status(500).send({
                erro:
                    "Não foi possivel adicionar a postagem, tente novamente!"})
        }

        
    },

    async delete(req, res){
        //Pegando o id do aluno que esta logado
        const created_aluno_id = req.alunoId;

        //pegando o id do post a apagar
        const { id } = req.params;

        //procura o post pelo id
        let postagem = await Postagem.findByPk(id);

        //se a postagem não existir, retorna not found
        if(!postagem){
            return res.status(404).send({ error: "Postagem não encontrada"})
        }

        if(postagem.created_aluno_id != created_aluno_id){
            return res
            .status(401)
            .send({ error: "Você não tem autorização para excluir essa postagem!"})
        }

        // efetua a exclusão da postagem
        await postagem.destroy();

        res.status(204).send();
    },

    
}