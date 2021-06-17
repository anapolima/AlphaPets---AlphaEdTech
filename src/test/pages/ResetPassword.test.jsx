import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { useUser } from "../../hooks/UserProvider";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import api from "../../services/api";
import AxiosMock from "axios-mock-adapter";

jest.mock("../../hooks/useHistory.js", () =>
{
    return {
        UseHistory ()
        {
            return {
                goBack: jest.fn()
            };
        }
    };
});

const mockedUseUser = useUser;

jest.mock("../../hooks/UserProvider.js");

const apiMock = new AxiosMock(api);

describe("Reset Password Page", () =>
{
    it("should not reset password if passwords don't match", () =>
    {
        mockedUseUser.mockReturnValue({
            tryingToRecoverPassword: {
                code: "123456",
                id: 1,
                email: "email@email.com",
                solicitationTimeout: 1632781
            }
        });

        const event = { preventDefault: () => {} };
        jest.spyOn(event, "preventDefault");

        const { getByText, getByTestId } = render( <ResetPassword/> );

        const code = getByTestId("test-verification-code");
        const password = getByTestId("test-new-password");
        const confirmPassword = getByTestId("test-confirm-new-password");

        const goBack = getByTestId("test-go-back-button");
        const submitForm = getByTestId("test-reset-button");

        fireEvent.change(code, {target: {value: "123456"}});
        fireEvent.change(password, {target: {value: "ana"}});
        fireEvent.change(confirmPassword, {target: {value: "aa"}});

        fireEvent.click(goBack);
        fireEvent.submit(submitForm);

        expect(getByText("As senhas não correspondem!")).toBeInTheDocument();

    });

    it("should not reset password if code is wrong", () =>
    {
        mockedUseUser.mockReturnValue({
            tryingToRecoverPassword: {
                code: "12345",
                id: 1,
                email: "email@email.com",
                solicitationTimeout: 1632781
            }
        });

        const event = { preventDefault: () => {} };
        jest.spyOn(event, "preventDefault");

        const { getByText, getByTestId } = render( <ResetPassword/> );

        const code = getByTestId("test-verification-code");
        const password = getByTestId("test-new-password");
        const confirmPassword = getByTestId("test-confirm-new-password");

        const goBack = getByTestId("test-go-back-button");
        const submitForm = getByTestId("test-reset-button");

        fireEvent.change(code, {target: {value: "123456"}});
        fireEvent.change(password, {target: {value: "ana"}});
        fireEvent.change(confirmPassword, {target: {value: "ana"}});

        fireEvent.click(goBack);
        fireEvent.submit(submitForm);

        expect(getByText("Código inválido!")).toBeInTheDocument();

    });

    it("should not reset password if time has expired", () =>
    {
        mockedUseUser.mockReturnValue({
            tryingToRecoverPassword: {
                code: "123456",
                id: 1,
                email: "email@email.com",
                solicitationTimeout: 0
            }
        });

        const event = { preventDefault: () => {} };
        jest.spyOn(event, "preventDefault");

        const { getByText, getByTestId } = render( <ResetPassword/> );

        const code = getByTestId("test-verification-code");
        const password = getByTestId("test-new-password");
        const confirmPassword = getByTestId("test-confirm-new-password");

        const goBack = getByTestId("test-go-back-button");
        const submitForm = getByTestId("test-reset-button");

        fireEvent.change(code, {target: {value: "123456"}});
        fireEvent.change(password, {target: {value: "ana"}});
        fireEvent.change(confirmPassword, {target: {value: "ana"}});

        fireEvent.click(goBack);
        fireEvent.submit(submitForm);

        expect(getByText("O tempo para esta solicitação expirou!")).toBeInTheDocument();
    });

    it("should reset password if everything is ok", () =>
    {
        mockedUseUser.mockReturnValue({
            tryingToRecoverPassword: {
                code: "123456",
                id: 1,
                email: "email@email.com",
                solicitationTimeout: 163278198343892
            }
        });

        apiMock.onGet("users/1").reply(200, {
            name: "name test",
            email: "emailtest@email.com",
            password: "passwordtest",
            confirmPassword: "passwordtest"
        });

        const event = { preventDefault: () => {} };
        jest.spyOn(event, "preventDefault");

        const { getByText, getByTestId } = render( <ResetPassword/> );

        const code = getByTestId("test-verification-code");
        const password = getByTestId("test-new-password");
        const confirmPassword = getByTestId("test-confirm-new-password");

        const goBack = getByTestId("test-go-back-button");
        const submitForm = getByTestId("test-reset-button");

        fireEvent.change(code, {target: {value: "123456"}});
        fireEvent.change(password, {target: {value: "ana"}});
        fireEvent.change(confirmPassword, {target: {value: "ana"}});

        fireEvent.click(goBack);
        fireEvent.submit(submitForm);

        expect(getByText("Senha alterada com sucesso!")).toBeInTheDocument();
    });
});
