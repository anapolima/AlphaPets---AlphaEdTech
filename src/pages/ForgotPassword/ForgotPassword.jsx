import React, { useCallback, useState } from "react";
import { ForgotContainer } from "./Style";
import { useUser } from "../../hooks/UserProvider.js";
import { UseHistory } from "../../hooks/useHistory";

function ForgotPassword ()
{
    const history = UseHistory();
    const { resetPassword } = useUser();

    const [email, setEmail] = useState("");
    
    const handleResetPassword = useCallback( (event) =>
    {
        event.preventDefault();
        resetPassword(email);
        history.push("/reset-password");
    });
    
    return (
        < ForgotContainer>

            <div>
                <h1>Esqueceu a sua senha?</h1>

                <form onSubmit={handleResetPassword}>
                    <input
                        type="email"
                        required
                        placeholder="E-mail para recuperação de senha"
                        onChange={ (event) => setEmail(event.target.value)}
                        data-testid="test-email-recover"
                        autoFocus />
                    <button
                        type="submit"
                        data-testid="test-submit-button">Enviar e-mail</button>
                </form>
            </div>

            <div className="go-back">
                <p
                    data-testid="test-go-back-button"
                    onClick={ () => history.goBack() }>Voltar</p>
            </div>
        </ForgotContainer>
    );
}

export default ForgotPassword;
