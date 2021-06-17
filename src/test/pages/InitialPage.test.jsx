import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Initial from "../../pages/Initial/Initial";

jest.mock("../../hooks/useHistory.js", () =>
{
    return {
        UseHistory ()
        {
            return {
                push: jest.fn()
            };
        }
    };
});

describe("Initial Page", () =>
{
    it("should be render correctly", () =>
    {
        const { getByText, getByTestId } = render(<Initial/>);

        const loginButton = getByTestId("test-make-login-button");
        const registerButton = getByTestId("test-register-user-button");
        
        fireEvent.click(loginButton);
        fireEvent.click(registerButton);
        
        expect(getByText("Fazer login")).toBeInTheDocument();
        expect(getByText("Cadastre-se")).toBeInTheDocument();
    });
});
