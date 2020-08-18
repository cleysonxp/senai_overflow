import React, { useState } from 'react';

const HelloWorld = () =>{
  return (
    <div>Hello World, React JS</div>
  );
}

const BemVindo = (props) =>{
return <div>{props.texto}</div>;
}

const Login = () =>{

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handlerEmail = (e) =>{
      setEmail(e.target.value);
  }

  const handlerSenha = (e) =>{
    setSenha(e.target.value);
  }

  const entrar = async () =>{
    const retorno = await fetch( "http://localhost:3333/sessao", {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        senha
      })
    })

    console.log(await retorno.json())
  }

  return(
    <>
      <input 
        type="text" 
        value={email} 
        onChange={handlerEmail} 
        placeholder="Insira o seu email"
      />

      <input 
        type="password" 
        value={senha}
        onChange={handlerSenha}
        placeholder="Insira a sua senha"
      />

      <button 
        onClick={entrar}
      >
        Entrar      
      </button>
    </>
  );
}

function App() {
  return(
    <>
    {/* isso é um cometario */}
      <HelloWorld/>
      <BemVindo texto="Bem Vindo ao React JS"/>
      <Login/>
    </>
  );
}

export default App;
