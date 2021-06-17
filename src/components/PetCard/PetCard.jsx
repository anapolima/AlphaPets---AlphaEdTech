import React from "react";
import { CardStyle } from "./Style";
import petImage from "../../images/image-not-found.jpg";

function PetCard ( { pet } ) 
{
    return (
        < CardStyle>
            <div className="image">
                {
                    pet.image ? 
                        <img src={pet.image} alt={pet.name} height="150px" width="200px"/>
                        :
                        <img className="image-not-found" src={petImage} alt={pet.name} height="150px" width="200px"/>
                }
            </div>

            <div>
                <p className="pet-name">{pet.name}</p>

                <p className="informations">{pet.type}</p>
                <p className="informations">{pet.age} anos</p>
                <p className="informations">{pet.weight} kg</p>
                <p className="informations">{pet.raca}</p>
            </div>
        </CardStyle>
    );
}

export default PetCard;
