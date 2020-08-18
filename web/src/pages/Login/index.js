
import React from "react";

import { Container, ImageCropped, Form, Titulo, SubTitulo, InputGroup, Button } from "./styles";

import foto from "../../assets/foto.jpg"

const Login = () => {
    return (
        <Container>
            <ImageCropped>
                <img src={foto} alt="imagem de capa" />
            </ImageCropped>
            <Form>
                <Titulo>
                    SENAI OVERFLOW
                </Titulo>
                <SubTitulo>
                    Compartilhe suas dúvidas
                </SubTitulo>
                <InputGroup>
                    <label>E-Mail</label>
                    <input type="email" placeholder="Insira seu e-mail" />
                </InputGroup>
                <InputGroup>
                    <label>Senha</label>
                    <input type="password" placeholder="Insira sua senha" />
                </InputGroup>
                <Button>Entrar</Button>
                <Button>Registra-se</Button>
            </Form>
        </Container>
    )
}

export default Login;