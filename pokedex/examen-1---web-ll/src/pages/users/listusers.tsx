import React from 'react';
import GetUsers from "../../components/users/Pokedex";

const ObtenerUsuarios = () => {
    return (
        <div className="container">
            <h2>Uso de un componente externo</h2>
    <br/>
    <GetUsers />
    </div>
);
}

export default ObtenerUsuarios;
