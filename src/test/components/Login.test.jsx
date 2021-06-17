import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Login from "../../components/Login/Login";

jest.mock("../../hooks/useHistory.js", () => 
{
    return {
        UseHistory () 
        {
            return {
                push: jest.fn(),
                replace: jest.fn()
            };
        }
    };
});

const mockedUserLogin = jest.fn();

jest.mock("../../hooks/UserProvider.js", () =>
{
    return {
        useUser ()
        {
            return {
                userLogin: mockedUserLogin
            };
        }
    };
});

describe("Login Component", () =>
{
    it("should be render correctly", async () =>
    {
        const { getByTestId, getByText } = render ( < Login/>);

        const email = getByTestId("user-email-login");
        const password = getByTestId("user-password-login");
        const loginButton = getByTestId("login-button");
        const noAccount = getByTestId("test-new-account");
        const forgotPassword = getByTestId("test-forgot-password");
        const goBack = getByTestId("test-go-back-button");

        fireEvent.change(email, {target: {value: "anapaula@gmail.com"}});
        fireEvent.change(password, {target: {value: "ana"}});
        fireEvent.click(loginButton);
        fireEvent.click(noAccount);
        fireEvent.click(forgotPassword);
        fireEvent.click(goBack);

        const userData = { 
            email: email.value,
            password: password.value
        };

        await mockedUserLogin(userData);

        expect(getByText("Entrar")).toBeInTheDocument();
        expect(mockedUserLogin).toHaveBeenCalledWith(userData);
    });
});
