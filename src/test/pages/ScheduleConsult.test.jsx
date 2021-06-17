import React from "react";
import { fireEvent, render } from "@testing-library/react";
import SchedulePage from "../../pages/ScheduleConsult/ScheduleConsult";
import { useUser } from "../../hooks/UserProvider";
import AxiosMock from "axios-mock-adapter";
import api from "../../services/api";

const mockedUseUser = useUser;
const apiMock = new AxiosMock(api);

jest.mock("../../hooks/UserProvider.js");

describe("Schedule Consults Page", () =>
{
    it("should be rendering correctly", () =>
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

        apiMock.onGet("schedule").reply(200, [
            {
                "day": "10",
                "weekDay": "Quinta-feira",
                "monthName": "Junho",
                "month": 6,
                "year": "2021",
                "id": 1,
                "hoursAvailable": [
                    "09:00",
                    "09:30",
                    "10:00",
                    "10:30",
                    "11:00",
                    "11:30",
                    "13:00",
                    "13:30",
                    "14:00",
                    "14:30",
                    "15:00",
                    "15:30",
                    "16:00",
                    "16:30",
                    "17:00",
                    "17:30"
                ]
            },
            {
                "day": "11",
                "weekDay": "Sexta-feira",
                "monthName": "Julho",
                "month": 7,
                "year": "2021",
                "id": 2,
                "hoursAvailable": [
                    "09:00",
                    "09:30",
                    "10:00",
                    "10:30",
                    "11:00",
                    "11:30",
                    "13:00",
                    "13:30",
                    "14:00",
                    "14:30",
                    "15:00",
                    "15:30",
                    "16:00",
                    "16:30",
                    "17:00",
                    "17:30"
                ]
            }
        ]);

        const { getByText, getByTestId } = render (< SchedulePage/>);

        const choosenPet = getByTestId("test-choose-pet");
        const choosenTosa = getByTestId("test-choose-tosa");
        const choosenBath = getByTestId("test-choose-bath");
        const choosenClicino = getByTestId("test-choose-clinico");
        const choosenMonth = getByTestId("test-choose-month");
        // const choosenHour = getByTestId("test-choose-hour");
        
        // const submitConsult = getByTestId("test-submit-consult");
        
        fireEvent.change(choosenPet, {target: {value: "Luna"}});
        fireEvent.change(choosenMonth, {target: {value: 6}});
        
        // const choosenDay = getByTestId("test-choose-day");
        // fireEvent.change(choosenDay, {target: {value: "10"}});
        // fireEvent.change(choosenHour, {target: {value: "09:00"}});


        fireEvent.click(choosenTosa);
        fireEvent.click(choosenBath);
        fireEvent.click(choosenClicino);
        // fireEvent.click(submitConsult);

        expect(getByText("Agende uma consulta")).toBeInTheDocument();
    });
});
