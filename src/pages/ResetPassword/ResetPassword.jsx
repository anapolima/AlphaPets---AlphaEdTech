import React, { useCallback, useState } from "react";
import { UseHistory } from "../../hooks/useHistory";
import { useUser } from "../../hooks/UserProvider";
import api from "../../services/api";
import { ResetPasswordStyle } from "./Style";

function ResetPassword ()
{
    const history = UseHistory();
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const [codeMessage, setCodeMessage] = useState("");
    const [message, setMessage] = useState("");

    const { tryingToRecoverPassword } = useUser();

    const handleData = useCallback ( async (event) =>
    {
        event.preventDefault();
        const currentTime = Math.trunc( Date.now() / 1000);

        if (code !== tryingToRecoverPassword.code)
        {
            setCodeMessage("Código inválido!");
        } 
        else if (password !== confirmPassword)
        {
            setCodeMessage("");
            setMessage("As senhas não correspondem!");
        }
        else if ( currentTime > tryingToRecoverPassword.solicitationTimeout )
        {
            setMessage("O tempo para esta solicitação expirou!");
        }
        else
        {
            setMessage("Senha alterada com sucesso!");
            const { data: userData } = await api.get(`/users/${tryingToRecoverPassword.id}`);

            const updatedUserData = {
                ...userData,
                password: password,
                confirmPassword: confirmPassword
            };

            api.put(`/users/${tryingToRecoverPassword.id}`, updatedUserData);
        }


    }, [tryingToRecoverPassword, password, confirmPassword, code]);
    
    return (
        <ResetPasswordStyle>
            <div>
                <h1>Insira o código que você recebeu por e-mail</h1>
            
                <form onSubmit={handleData}>
                    <div className="block">

                        <input
                            type="text"
                            autoFocus
                            placeholder="Código de verificação"
                            data-testid="test-verification-code"
                            onChange={ (event) => { setCode(event.target.value); }}/>

                        <p className="error-message">
                            { codeMessage ? codeMessage : ""}
                        </p>
                    </div>

                    <div className="block new-password">

                        <input
                            type="password"
                            placeholder="Nova senha"
                            required
                            minLength="6"
                            maxLength="16"
                            data-testid="test-new-password"
                            onChange={ (event) => { setPassword(event.target.value); }}/>

                        <input
                            type="password"
                            required
                            minLength="6"
                            maxLength="16"
                            placeholder="Confirme a nova senha"
                            data-testid="test-confirm-new-password"
                            onChange={ (event) => { setConfirmPassword(event.target.value); }}/>

                        <p className="error-message">
                            { message ? message : ""}
                        </p>
                    </div>

                    <button
                        type="submit"
                        data-testid="test-reset-button">
                        Atualizar senha
                    </button>
                </form>
            </div>

            <div className="go-back">
                <p
                    data-testid="test-go-back-button"
                    onClick={ () => history.goBack() }>Voltar</p>
            </div>
        </ResetPasswordStyle>
    );
}

export default ResetPassword;
