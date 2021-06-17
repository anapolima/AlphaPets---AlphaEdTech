import React from "react";
import { UseHistory } from "../../hooks/useHistory";

import { MenuStyle } from "./Style";

function MenuLateral ()
{
    const history = UseHistory();

    return (
        <MenuStyle>
            <button
                onClick={ () => history.push("/home")}>
                    Ver consultas agendadas
            </button>

            <button
                onClick={ () => history.push("/schedule-consult")}>
                    Agendar consulta
            </button>

            <button
                onClick={ () => history.push("/my-pets")}>
                    Meus pets
            </button>

            <button
                onClick={ () => history.push("/account")}>
                    Informações sobre a conta
            </button>
        </MenuStyle>
    );
}

export default MenuLateral;
