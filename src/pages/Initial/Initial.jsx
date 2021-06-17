import React from "react";
import { UseHistory } from "../../hooks/useHistory";
import { InitialContainer } from "./Style";

function Initial () 
{
    const history = UseHistory();

    return (
        < InitialContainer>

            <div className="content">
                <h1>Bem vindo ao AlphaPet</h1>

                <button
                    className="btn btn-login"
                    onClick={ () => history.push("/login")}
                    data-testid="test-make-login-button">Fazer login</button>

                <button
                    className="btn btn-register"
                    onClick={ () => history.push("/register")}
                    data-testid="test-register-user-button">Cadastre-se</button>

            </div>
        </InitialContainer>
    );
}

export default Initial;
