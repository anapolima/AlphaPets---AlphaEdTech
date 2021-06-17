import React, { useCallback } from "react";
import { UseHistory } from "../../hooks/useHistory";
import { useUser } from "../../hooks/UserProvider";
import { AccountInfotmationStyle } from "./Style";

function Account ()
{
    const history = UseHistory();

    const { loggedUser, userLogoff } = useUser();

    const handleLogoff = useCallback( () =>
    {
        userLogoff();
        history.replace("/");
    }, [loggedUser]);

    return (
        < AccountInfotmationStyle>
            <div>
                <h1>Informações da conta</h1>

                <div>
                    <p className="user-name">{loggedUser.name} </p>
                    <p className="user-email">{loggedUser.email}</p>
                    <p className="registered-pets">Pets registrados: <span>{loggedUser.pets ? loggedUser.pets.length : 0}</span></p>
                    <p className="scheduled-consults">Total de consultas agendadas: <span>{loggedUser.consults ? loggedUser.consults.length : 0}</span></p>

                    <p
                        className="change-password"
                        data-testid="test-change-password-button"
                        onClick={ () => history.push("/forgot-password")}>Alterar senha</p>

                    <button
                        data-testid="test-logout-button"
                        onClick={ () => handleLogoff()}>Sair</button>
                </div>

            </div>

            <div className="go-back">
                <p
                    data-testid="test-go-back-button"
                    onClick={ () => history.goBack() }>Voltar</p>
            </div>
        </AccountInfotmationStyle>
    );
}

export default Account;
