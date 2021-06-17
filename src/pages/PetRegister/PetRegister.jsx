import React from "react";
import RegisterPet from "../../components/RegisterPet/RegisterPet";
import { PetRegisterStyle } from "./Style";

function PetRegister ()
{
    return (
        <PetRegisterStyle>
            <RegisterPet/>
        </PetRegisterStyle>
    );
}

export default PetRegister;
