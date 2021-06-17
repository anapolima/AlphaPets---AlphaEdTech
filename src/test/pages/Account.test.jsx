import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { useUser } from "../../hooks/UserProvider";
import Account from "../../pages/Account/Account";

jest.mock("../../hooks/useHistory.js", () =>
{
    return {
        UseHistory ()
        {
            return {
                push: jest.fn(),
                replace: jest.fn,
                goBack: jest.fn()
            };
        }
    };
});

const mockedUseUser = useUser;

jest.mock("../../hooks/UserProvider.js");

describe("Account Page", () =>
{
    it("should be rendering correctly when usar has pets and consults", () =>
    {
        mockedUseUser.mockReturnValue({
            userLogoff: jest.fn(),
            loggedUser: {
                "name": "ana",
                "email": "ana@gmail",
                "password": "ana",
                "confirmPassword": "ana",
                "id": "1",
                "pets": [
                    {
                        "name": "Luna",
                        "type": "gato",
                        "age": "5",
                        "weight": "4",
                        "raca": "ND" 
                    },
                    {
                        "name": "Haka",
                        "type": "cachorro",
                        "age": "5",
                        "weight": "20",
                        "raca": "ND" 
                    }
                ],
                "consults": [
                    {
                        petName: "Lindo",
                        services: ["banho"],
                        month: 6,
                        monthName: "Junho",
                        weekDay: "Quinta-feira",
                        day: "10",
                        hour: "09:30",
                    }
                ]
            }
        });

        const { getByText, getByTestId } = render (< Account/>);

        const changePassword = getByTestId("test-change-password-button");
        const logoff = getByTestId("test-logout-button");
        const goBack = getByTestId("test-go-back-button");

        fireEvent.click(changePassword);
        fireEvent.click(logoff);
        fireEvent.click(goBack);
        
        expect(getByText("ana")).toBeInTheDocument();
        expect(getByText("ana@gmail")).toBeInTheDocument();

    });

    it("should be rendering correctly when usar has no pets and consults", () =>
    {
        mockedUseUser.mockReturnValue({
            userLogoff: jest.fn(),
            loggedUser: {
                "name": "ana",
                "email": "ana@gmail",
                "password": "ana",
                "confirmPassword": "ana",
                "id": "1"
            }
        });

        const { getByText, getByTestId } = render (< Account/>);

        const changePassword = getByTestId("test-change-password-button");
        const logoff = getByTestId("test-logout-button");
        const goBack = getByTestId("test-go-back-button");

        fireEvent.click(changePassword);
        fireEvent.click(logoff);
        fireEvent.click(goBack);
        
        expect(getByText("ana")).toBeInTheDocument();
        expect(getByText("ana@gmail")).toBeInTheDocument();

    });
});
