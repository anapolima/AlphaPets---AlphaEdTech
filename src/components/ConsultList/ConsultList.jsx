import React from "react";
import { useUser } from "../../hooks/UserProvider";
import ConsultCard from "../ConsultCard/ConsultCard";
import { ListStyle } from "./Style";

function ConsultsList ()
{
    const { loggedUser } = useUser();
    
    return (
        < ListStyle>
            <h1>Consultas agendadas</h1>

            {
                loggedUser.consults ? 
                    loggedUser.consults.map( (consult) =>
                    {   
                        return <ConsultCard consult={consult} key={consult.id}/>;
                    })
                    :
                    <p className="no-consults">Você não possui nenhuma consulta agendada.</p>
            }
        </ListStyle>
    );
}

export default ConsultsList;
