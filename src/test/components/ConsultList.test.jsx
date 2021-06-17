import { render } from "@testing-library/react";
import ConsultsList from "../../components/ConsultList/ConsultList";
import React from "react";
import { useUser } from "../../hooks/UserProvider";

const mockLoggedUser = useUser;

jest.mock("../../hooks/UserProvider.js");

describe("Consult List", () =>
{
    it("should be rendering correctly when there was no consilt", () =>
    {
        mockLoggedUser.mockReturnValueOnce({
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
            }
        });

        const {getByText} = render ( < ConsultsList />);

        expect(getByText("Você não possui nenhuma consulta agendada.")).toBeInTheDocument();
    });

    it("should be rendering correctly when there was consults", () =>
    {
        mockLoggedUser.mockReturnValueOnce({
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
                        id: 1,
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

        const {getByText} = render ( < ConsultsList />);

        expect(getByText("Lindo")).toBeInTheDocument();
    });
});
