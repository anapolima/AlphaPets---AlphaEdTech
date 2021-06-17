import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { useUser } from "../../hooks/UserProvider";
import PetsList from "../../components/PetList/PetList";

const mockUserLogged = useUser;

jest.mock("../../hooks/UserProvider.js");

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

describe("Pet List", () =>
{
    it("should render correctly when there is pets registered", () =>
    {
        mockUserLogged.mockReturnValueOnce({
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
                ]
            }
        });

        const { getByText } = render (< PetsList/>);

        expect(getByText("Luna")).toBeInTheDocument();
        expect(getByText("Haka")).toBeInTheDocument();
    });

    it("should render correctly when there is no pets registered", () =>
    {
        mockUserLogged.mockReturnValueOnce({
            loggedUser: {
                "name": "ana",
                "email": "ana@gmail",
                "password": "ana",
                "confirmPassword": "ana",
                "id": "1",
            }
        });

        const { getByText } = render (< PetsList/>);

        expect(getByText("Você não possui nenhum pet cadastrado.")).toBeInTheDocument();
        
    });

    it("should go to register pet page when button is clicked", () =>
    {
        mockUserLogged.mockReturnValueOnce({
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
                ]
            }
        });

        const { getByTestId } = render( <PetsList/>);

        const button = getByTestId("test-add-pet-button");

        fireEvent.click(button);

    });
});
