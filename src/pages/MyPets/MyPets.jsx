import React from "react";
import MenuLateral from "../../components/MenuLateral/Menu.jsx";
import PetsList from "../../components/PetList/PetList.jsx";
import { MyPetsStyle } from "./Style.jsx";

function MyPets ()
{
    return (
        < MyPetsStyle>
            < PetsList/>
            < MenuLateral/>
        </MyPetsStyle>
    );
}

export default MyPets;
