import React, { useCallback, useState } from "react";
import { UseHistory } from "../../hooks/useHistory.js";
import { useUser } from "../../hooks/UserProvider.js";
import { LoginStyle } from "./Style.jsx";

function Login () 
{
    const { userLogin } = useUser();
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ errorMessage, setErrorMessage ] = useState("");

    const history = UseHistory();

    const handleUserData = useCallback( async (event) =>
    {   
        event.preventDefault();
        const userData = {};

        userData.email = email;
        userData.password = password;

        const loginStatus = await userLogin(userData);

        if (loginStatus.status === "success")
        {
            setErrorMessage("");
            history.push("/home");
        }
        else
        {
            setErrorMessage("E-mail ou senha inválidos!");
        }
    }, [email, password]);


    return (
        < LoginStyle>
            <div className="left-login-content">
                <h1>Faça o seu login</h1>

                <form onSubmit={handleUserData}>
                    <input
                        type="text"
                        placeholder="Email"
                        id="user-email-login"
                        required autoFocus
                        onChange={ (event) => setEmail(event.target.value)}
                        data-testid="user-email-login"/>

                    <input
                        type="password"
                        placeholder="Senha"
                        id="user-password-login"
                        required
                        onChange={ (event) => setPassword(event.target.value)}
                        data-testid="user-password-login"/>

                    <div className="block">
                        { errorMessage ? <p className="error-message">{errorMessage}</p> : "" }

                        <button
                            type="submit"
                            onClick={handleUserData}
                            data-testid="login-button">Entrar</button>
                    </div>

                    <div className="links-block">
                        <p
                            onClick={ () => history.push("/forgot-password")}
                            data-testid="test-forgot-password">Esqueceu a sua senha?</p>

                        <p
                            onClick={ () => history.push("/register")}
                            data-testid="test-new-account">Não tem uma conta? Cadastre-se</p>
                    </div>
                </form>
            </div>

            <div className="go-back">
                <p
                    onClick={ () => history.replace("/") }
                    data-testid="test-go-back-button">Voltar</p>
            </div>
        </ LoginStyle>
    );
}

export default Login;
