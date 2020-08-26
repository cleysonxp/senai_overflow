import React from 'react';

import { Alert } from './styles';

function Alerts( props ) {
    const { mensagem } = props;
    return mensagem ? (
       <Alert>
           <h1>{mensagem}</h1>
           
       </Alert>
    ) : null;
}

export default Alerts;