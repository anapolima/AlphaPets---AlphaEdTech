import React, { useCallback, useState } from "react";
import { UseHistory } from "../../hooks/useHistory.js";

import { useUser } from "../../hooks/UserProvider.js";
import { Register } from "./Style.jsx";


function RegisterUser () 
{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const history = UseHistory();

    const { addNewUser } = useUser();

    const handleUserData = useCallback( async (event) =>
    {   
        event.preventDefault();
                
        const userData = {};
                        
        userData.name = name;
        userData.email = email;
        userData.password = password;
        userData.confirmPassword = confirmPassword;
            
        const addResult = await addNewUser(userData);
       
        if (addResult.result === 1)
        {
            setErrorMessage("As senhas não correspondem!");
        }
        else if (addResult.result === 2)
        {
            setErrorMessage("Email já cadastrado!");
        }
        else
        {
            history.push("/home");
        }

    }, [name, email, password, confirmPassword]);
    
    return (
        <>
            < Register>

                <div className="conteiner">

                    <form 
                        onSubmit={handleUserData}
                        data-testid="test-submit-register-form" >

                        <h1>Cadastre-se</h1>

                        <input
                            type="text"
                            placeholder="Nome"
                            id="user-name-register"
                            minLength="3"
                            required autoFocus
                            onChange={(event) => setName(event.target.value)}
                            data-testid="test-name-register-input"/>

                        <input
                            type="email"
                            placeholder="Email"
                            id="user-email-register"
                            required
                            onChange={(event) => setEmail(event.target.value)}
                            data-testid="test-email-register-input"/>

                        <input
                            type="password"
                            placeholder="Senha"
                            id="user-password-register"
                            required
                            onChange={(event) => setPassword(event.target.value)}
                            minLength="6"
                            maxLength="16"
                            data-testid="test-password-register-input"/>

                        <div className="block">
                            <input
                                type="password"
                                placeholder="Confirme sua senha"
                                id="user-confirm-password-register"
                                minLength="6"
                                maxLength="16"
                                required onChange={(event) => { setConfirmPassword(event.target.value); }}
                                data-testid="test-confpasswd-register-input"/>

                            { 
                                errorMessage ? <p className="error-message" data-testid="test-register-error-message">{errorMessage}</p> : 
                                    (password !== confirmPassword ? <p className="error-message" data-testid="test-register-error-message">As senhas não correspondem!</p> : (""))
                            }
                        </div>

                        <button
                            type="submit">Cadastrar</button>

                        <p
                            className="link"
                            onClick={ () => history.push("/login")}
                            data-testid="test-go-to-login-page">Já possui uma conta? Faça login</p>
                    </form>
                </div>

                <div className="go-back">
                    <p
                        onClick={ () => history.replace("/") }
                        data-testid="test-go-to-initial-page">Voltar</p>
                </div>
            </Register>
        </>
    );
}

export default RegisterUser;
