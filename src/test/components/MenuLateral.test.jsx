import React from "react";
import { fireEvent, render } from "@testing-library/react";
import MenuLateral from "../../components/MenuLateral/Menu";

jest.mock("../../hooks/useHistory", () =>
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

describe("Menu Lateral", () =>
{
    it("should be rendering correctly", () => 
    {
        const { getByText } = render (< MenuLateral/>);

        expect(getByText("Ver consultas agendadas")).toBeInTheDocument();
        expect(getByText("Agendar consulta")).toBeInTheDocument();
        expect(getByText("Meus pets")).toBeInTheDocument();
        expect(getByText("Informações sobre a conta")).toBeInTheDocument();

        fireEvent.click(getByText("Ver consultas agendadas"));
        fireEvent.click(getByText("Agendar consulta"));
        fireEvent.click(getByText("Meus pets"));
        fireEvent.click(getByText("Informações sobre a conta"));
    });
});
