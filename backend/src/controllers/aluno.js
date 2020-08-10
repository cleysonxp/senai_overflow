const { Op } = require("sequelize");
const Aluno = require("../models/Aluno");

module.exports = {
    //lista todo os alunos
    async listar(req, res){
        const alunos = await Aluno.findAll();

        res.send(alunos);
    },
    //Buscar aluno pelo id
    async buscarPorId(req, res){
        const {id} = req.params;

        //busca o aluno pela chave
        let aluno = await Aluno.findByPk(id, { raw: true});

        //Verifica se o aluno não foi encontrado
        if(!aluno){
            return res.status(404).send({erro: "Aluno não encontrado"});
        }

        delete aluno.senha;

        //retorna o aluno encontrado
        res.send(aluno);
    },


    //Inserções
    async store(req, res){
        
        const {ra, nome, email, senha} = req.body;
    
        //Verificar se aluno existe no banco
        //select * from 
        let aluno = await Aluno.findOne({
            where: { [Op.or]: [ {ra: ra},{email: email}],
            },
        });
        
        if(aluno){
            return  res.status(400).send({erro: "Aluno já cadastrado" });
        }

        aluno = await Aluno.create({ra, nome, email, senha});       
    
        res.status(201).send(aluno);
    },
    update(){},
    delete(){},
};