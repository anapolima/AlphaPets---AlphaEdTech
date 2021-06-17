import React from "react";
import RegisterUser from "../../components/ResgisterUser/RegisterUser.jsx";
import { UserRegisterStyle } from "./Style";

function UserRegister ()
{
    return (
        < UserRegisterStyle>
            < RegisterUser/>
        </ UserRegisterStyle>
    );
}

export default UserRegister;
