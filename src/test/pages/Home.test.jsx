import React from "react";
import { render } from "@testing-library/react";
import Home from "../../pages/Home/Home";
import { useUser } from "../../hooks/UserProvider";

const mockedUseUser = useUser;

jest.mock("../../hooks/UserProvider.js");

describe("Home Page", () =>
{
    it("should render correctly", () =>
    {
        mockedUseUser.mockReturnValue({
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

        render ( < Home />);
    });
});
