import React, { useRef, useEffect } from 'react';

import { Alert } from './styles';

function Alerts( props ) {

    const alertEl = useRef();

    useEffect( () =>{
        alertEl.current.style.width = "300px";
    });

    const { mensagem, tipo, setMensagem } = props;

    return(
       <Alert ref={alertEl} tipo={tipo}>
            <h1>{mensagem}</h1>
            <spam
                onClick={() =>{
                    setMensagem(undefined);
                }}
            >
                &times;
            </spam>           
       </Alert>
    );
}

export default Alerts;