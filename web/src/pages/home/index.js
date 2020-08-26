import React, { useEffect, useState } from 'react';

import { FiGithub, FiLogOut } from 'react-icons/fi';
import fotoPerfil from "../../assets/foto_perfil.png";
import imgPost from "../../assets/post-exemplo.jpg";

import './styles.css';
import { signOut, getAluno } from '../../services/security';
import { useHistory } from 'react-router-dom';
import { api } from "../../services/api";

const CardPost = ({post}) =>{
     
    const [mostrarComentarios, setMostrarComentarios ] = useState(false);
    const [comentarios, setComentarios] = useState([]);

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

    return(
        <div className="card-post">
                    <header>
                        <img src={fotoPerfil} alt="Foto de perfil"/>

                        <strong>{post.Aluno.nome}</strong>
                        <p> {post.createdAt}</p>
                        {post.gists && (<FiGithub className="icon" size={20}/>)}
                    </header>

                    <body>
                        <strong>
                            {post.titulo}
                        </strong>

                        <p>
                            {post.descricao}
                        </p>

                        <img src={imgPost} alt="Imagem do post"/>
                    </body>

                    <footer>
                        <h1 onClick={carregarComentarios}>Comentários</h1>
                        {mostrarComentarios && (
                            <>
                                {comentarios.length === 0 && (<p>Seja o primeiro a comentar!</p>)}
                                {comentarios.map((coment)=>(
                                    <section>
                                        <header>
                                            <img src={fotoPerfil} alt="Foto de perfil"/>

                                            <strong>{coment.Aluno.nome}</strong>
                                            <p> {coment.created_at}</p>
                                        </header>

                                        <p>{coment.descricao}</p>
                                    </section>  
                                ))}
                                                              
                            </>
                        )}                        
                    </footer>
                </div>
    )
}

function Home() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory();
    const [postagens, setPostagens] = useState([]);
    
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

                <a href="#">Editar foto</a>

                <strong>Nome:</strong>
                <p>{alunoSessao.nome}</p>

                <strong>RA:</strong>
                <p>{alunoSessao.ra}</p>
            </section>

            <section className="feed">
                {postagens.map( (post) =>(
                    <CardPost post={post}/>
                ))}
                
            </section>
        </div>
    </div>
  );
}

export default Home;