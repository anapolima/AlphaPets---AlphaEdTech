import React from "react";
import {fireEvent, render} from "@testing-library/react";

import RegisterUser from "../../components/ResgisterUser/RegisterUser";

const mockedAddNewUsers = jest.fn();

jest.mock("../../hooks/UserProvider.js",
    () =>
    {
        return {
            useUser ()
            {
                return {
                    addNewUser: mockedAddNewUsers 
                };
            }
        };
    }
);

jest.mock("../../hooks/useHistory", () =>
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

describe("Register User Component", () =>
{
    it("should be able to add new users when there was no user registered and register data are correct", () =>
    {
        const { getByTestId } = render(<RegisterUser/>);

        const name = getByTestId("test-name-register-input");
        const email = getByTestId("test-email-register-input");
        const password = getByTestId("test-password-register-input");
        const confPassword = getByTestId("test-confpasswd-register-input");
        const submitForm = getByTestId("test-submit-register-form");

        fireEvent.change(name, {target: {value: "ana"}});
        fireEvent.change(email, {target: {value: "ana@gmail.com"}});
        fireEvent.change(password, {target: {value: "ana"}});
        fireEvent.change(confPassword, {target: {value: "ana"}});

        const event = { preventDefault: () => {} };
        jest.spyOn(event, "preventDefault");

        fireEvent.submit(submitForm);

        expect(mockedAddNewUsers).toHaveBeenCalledWith(
            {
                name: "ana",
                email: "ana@gmail.com",
                password: "ana",
                confirmPassword: "ana"
            });
    });

    it("should not be able to add new users when there was no user registered and register data are incorrect", () =>
    {
        const { getByTestId } = render(<RegisterUser/>);

        const name = getByTestId("test-name-register-input");
        const email = getByTestId("test-email-register-input");
        const password = getByTestId("test-password-register-input");
        const confPassword = getByTestId("test-confpasswd-register-input");
        const submitForm = getByTestId("test-submit-register-form");
        // const errorMessage = getByTestId("test-register-error-message");

        fireEvent.change(name, {target: {value: "ana"}});
        fireEvent.change(email, {target: {value: "ana@gmail.com"}});
        fireEvent.change(password, {target: {value: "ana"}});
        fireEvent.change(confPassword, {target: {value: "an"}});

        const event = { preventDefault: () => {} };
        jest.spyOn(event, "preventDefault");

        (fireEvent.submit(submitForm));

        expect(mockedAddNewUsers).toHaveBeenCalledWith(
            {
                name: "ana",
                email: "ana@gmail.com",
                password: "ana",
                confirmPassword: "an"
            });
   
    });

    it("should be able to add new users when there is user registered and register data are correct", () =>
    {
        const { getByTestId } = render(<RegisterUser/>);

        const name = getByTestId("test-name-register-input");
        const email = getByTestId("test-email-register-input");
        const password = getByTestId("test-password-register-input");
        const confPassword = getByTestId("test-confpasswd-register-input");
        const submitForm = getByTestId("test-submit-register-form");

        fireEvent.change(name, {target: {value: "ana"}});
        fireEvent.change(email, {target: {value: "anapaula@gmail.com"}});
        fireEvent.change(password, {target: {value: "ana"}});
        fireEvent.change(confPassword, {target: {value: "ana"}});

        const event = { preventDefault: () => {} };
        jest.spyOn(event, "preventDefault");

        fireEvent.submit(submitForm);

        expect(mockedAddNewUsers).toHaveBeenCalledWith(
            {
                name: "ana",
                email: "anapaula@gmail.com",
                password: "ana",
                confirmPassword: "ana"
            });
    });

    it("should not be able to add new users when there is user registered and register data are incorrect", () =>
    {
        const { getByTestId } = render(<RegisterUser/>);

        const name = getByTestId("test-name-register-input");
        const email = getByTestId("test-email-register-input");
        const password = getByTestId("test-password-register-input");
        const confPassword = getByTestId("test-confpasswd-register-input");
        const submitForm = getByTestId("test-submit-register-form");

        fireEvent.input(name, {target: {value: "ana"}});
        fireEvent.input(email, {target: {value: "anapaula@gmail.com"}});
        fireEvent.input(password, {target: {value: "ana"}});
        fireEvent.input(confPassword, {target: {value: "an"}});

        const event = { preventDefault: () => {} };
        jest.spyOn(event, "preventDefault");

        fireEvent.submit(submitForm);

        expect(mockedAddNewUsers).toHaveBeenCalledWith(
            {
                name: "ana",
                email: "anapaula@gmail.com",
                password: "ana",
                confirmPassword: "an"
            });
    });

    it("should be able to go to login page", () =>
    {
        const { getByTestId } = render(<RegisterUser/>);

        const loginPageButton = getByTestId("test-go-to-login-page");

        fireEvent.click(loginPageButton);
    });

    it("should be able to go to initial page", () =>
    {
        const { getByTestId } = render(<RegisterUser/>);

        const initialPageButton = getByTestId("test-go-to-initial-page");

        fireEvent.click(initialPageButton);
    });
});
