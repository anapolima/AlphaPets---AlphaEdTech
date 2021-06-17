import React from "react";
import PetCard from "../PetCard/PetCard";
import { ListStyle } from "./Style";
import { FaPlusCircle } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useUser } from "../../hooks/UserProvider";
import { UseHistory } from "../../hooks/useHistory";

function PetsList ()
{
    const history = UseHistory();

    const { loggedUser } = useUser();

    return (
        < ListStyle>
            <div className="title">
                <h1>Meus pets</h1>
                
                <IconContext.Provider value={{className: "icon" }}>
                    <div>
                        <FaPlusCircle 
                            onClick={ () => history.push("/register-pet")}
                            data-testid="test-add-pet-button"/>
                    </div>
                </IconContext.Provider>
            </div>

            { 
                loggedUser.pets ? loggedUser.pets.map( (pet) =>
                {
                    return <PetCard pet={pet} key={pet.id}/>;

                })
                    : <p className="no-pets">Você não possui nenhum pet cadastrado.</p>
            }
        </ListStyle>
    );
}

export default PetsList;
