import React from "react";
import { fireEvent, render } from "@testing-library/react";
import RegisterPet from "../../components/RegisterPet/RegisterPet";
import { useUser } from "../../hooks/UserProvider";

jest.mock("../../hooks/useHistory.js", () =>
{
    return {
        UseHistory ()
        {
            return {
                push: jest.fn(),
                goBack: jest.fn()
            };
        }
    };
});

const mockedAddPet = jest.fn();
const mockedUseUser = useUser;

jest.mock("../../hooks/UserProvider.js");

describe("Register Pet Component", () =>
{
    it("should register", () =>
    {
        mockedUseUser.mockReturnValue({
            addUserPets: mockedAddPet,
            loggedUser: {
                "name": "ana",
                "email": "ana@gmail",
                "password": "ana",
                "confirmPassword": "ana",
                "id": "1"
            }
        });

        const { getByTestId } = render( < RegisterPet/> );

        const petName = getByTestId("test-pet-name");
        const petAge = getByTestId("test-pet-age");
        const petWeight = getByTestId("test-pet-weight");
        const petType = getByTestId("test-pet-type");
        const petRaca = getByTestId("test-pet-raca");

        const goBack = getByTestId("test-go-back-button");
        const registerPet = getByTestId("test-pet-register-button");

        fireEvent.change(petName, {target: {value: "Luna"}});
        fireEvent.change(petAge, {target: {value: "5"}});
        fireEvent.change(petWeight, {target: {value: "4"}});
        fireEvent.change(petType, {target: {value: "gato"}});
        fireEvent.change(petRaca, {target: {value: "ND"}});

        fireEvent.click(goBack);
        fireEvent.click(registerPet);

    });
});
