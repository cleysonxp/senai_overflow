import React, { useEffect, useState } from 'react';

import { FiGithub, FiLogOut } from 'react-icons/fi';
import fotoPerfil from "../../assets/foto_perfil.png";
import imgPost from "../../assets/post-exemplo.jpg";

import './styles.css';
import { signOut, getAluno } from '../../services/security';
import { useHistory } from 'react-router-dom';
import { api } from "../../services/api";
import Popup from '../../components/Popup';



const CardPost = ({post}) =>{
     
    const [mostrarComentarios, setMostrarComentarios ] = useState(false);
    const [comentarios, setComentarios] = useState([]);
    const [novoComentario, setNovoComentario] = useState("");


    const carregarComentarios = async () =>{
        try {
            if(!mostrarComentarios){
                const retorno = await api.get(`/postagens/${post.id}/comentarios`);
                setComentarios(retorno.data);
            }
            
            setMostrarComentarios(!mostrarComentarios);
        } catch (error) {
            console.log(error);
        }  
    }

    const criarComentario = async (e) => {
        e.preventDefault();
        
        try {
            //chamada para a api, criando um novo comentario
            const retorno = await api.post(`/postagens/${post.id}/comentarios`, {
                descricao: novoComentario
            });

            //Recebe o retorno da api com o comentario criado 
            let comentario = retorno.data;

            //Coloca os dados do aluno logado nos comentarios criado
            comentario.Aluno = getAluno();

            //Atualiza a lista inserindo o novo comentario 
            //seta a lista com o que ela já tinha, e com o novo comentario
            setComentarios([...comentarios, comentario]); 

            //Limpa o campo novo comentario
            setNovoComentario("");

        } catch (error) {
            
        }
    }

    return(
        <div className="card-post">
                    <header>
                        <img src={fotoPerfil} alt="Foto de perfil"/>

                        <strong>{post.Aluno.nome}</strong>
                        <p> {post.createdAt}</p>
                        {post.gists && (<FiGithub className="icon" size={20}/>)}
                    </header>

                    <section>
                        <strong>
                            {post.titulo}
                        </strong>

                        <p>
                            {post.descricao}
                        </p>

                        <img src={imgPost} alt="Imagem do post"/>
                    </section>

                    <footer>
                        <h1 onClick={carregarComentarios}>Comentários</h1>
                        {mostrarComentarios && (
                            <>
                                {comentarios.length === 0 && (<p>Seja o primeiro a comentar!</p>)}
                                {comentarios.map((coment)=>(
                                    <section key={coment.id}>
                                        <header>
                                            <img src={fotoPerfil} alt="Foto de perfil"/>

                                            <strong>{coment.Aluno.nome}</strong>
                                            <p> {coment.created_at}</p>
                                        </header>

                                        <p>{coment.descricao}</p>
                                    </section>  
                                ))}
                                <form className="novo-comentario" onSubmit={criarComentario}>
                                    <textarea 
                                        value={novoComentario}
                                        onChange={(e) =>{
                                            setNovoComentario(e.target.value);
                                        }}
                                        placeholder="Comente essa dúvida" 
                                        required
                                        ></textarea>
                                    <button>Enviar</button>
                                </form>                         
                            </>
                        )}                        
                    </footer>
                </div>
    )
};



const NovaPostagem = ({setMostrarNovaPostagem}) =>{
    const [novaPostagem, setNovaPostagem] = useState({
        titulo: "",
        descricao: "",
        gists: "",
    })



    const fechar = () =>{
        const {titulo, descricao, gists} = novaPostagem;

        if((titulo || descricao || gists) && !window.confirm("Tem certeza que quer badonar a dúvida?")){
            return
        }

        setMostrarNovaPostagem(false);
    }

    const handlerInput = (e) =>{
        setNovaPostagem({...novaPostagem, [e.target.id]: e.target.value});
    }


    return (<Popup>
        <form className="nova-postagem">
            <span onClick={fechar}>&times;</span>
            <h1>Publique sua dúvida</h1>
            <label>Titulo</label>
            <input id="titulo" type="text" placeholder="Sobre o que é sua dúvida" onChange={handlerInput}/>
            <label>Descrição</label>
            <textarea id="descricao" placeholder="Descreva em detalhes, o que te aflinge!" onChange={handlerInput}></textarea>
            <label>Gists<em>(Opcional)</em></label>
            <input id="gists" type="text" placeholder="https://gits.github.com/......."onChange={handlerInput}/>
            <label>Imagem<em>(Opcional)</em></label>
            <input type="file"/>
            <img alt="preview"/>
            <button>Enviar</button>
        </form>
    </Popup>)
}

function Home() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory();
    const [postagens, setPostagens] = useState([]);
    const [mostrarNovaPostagem, setMostrarNovaPostagem] = useState(false);

    
    useEffect(() =>{
        const carregarPostagens = async () =>{
            try {
                const retorno = await api.get("/postagens")
                setPostagens(retorno.data);
            } catch (error) {
                console.log(error);
                
            }
        }
        carregarPostagens();
    }, []);

    const alunoSessao = getAluno();
    
    
    
  return (
    
    <div className="container">
        {mostrarNovaPostagem && <NovaPostagem setMostrarNovaPostagem={setMostrarNovaPostagem}/> }
        <header className="header">
            <div>
                <p>Senai Overflow</p>
            </div>

            <div>
                <input type="search" placeholder="Pesquiaar uma dúvida" id="" name=""/>    
            </div>

            <div>
                <button className="btnSair" onClick={ () => {
                    signOut();
                    history.replace("/");
                } }>
                    Sair <FiLogOut />
                </button>
            </div>
        </header>

        <div className="content">
            <section className="profile">
                <img src={fotoPerfil} alt="Foto de perfil"/>

                <label>Editar foto</label>

                <strong>Nome:</strong>
                <p>{alunoSessao.nome}</p>

                <strong>RA:</strong>
                <p>{alunoSessao.ra}</p>
            </section>

            <section className="feed">
                {postagens.map( (post) =>(
                    <CardPost key={post.id} post={post}/>
                ))}
                
            </section>

            <section className="actions">
                <button onClick={() =>{
                    setMostrarNovaPostagem(true)
                }}>Nova Postagem</button>
            </section>
        </div>
    </div>
    
  );
}

export default Home;