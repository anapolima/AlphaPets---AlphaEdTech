import { render } from "@testing-library/react";
import React from "react";
import ConsultCard from "../../components/ConsultCard/ConsultCard";

describe("Consult Card", () =>
{
    it("should be able to render correctly", () =>
    {
        const { getByText } = render( <ConsultCard consult={{
            "petName": "Lindo",
            "services": ["banho"],
            "month": 6,
            "monthName": "Junho",
            "weekDay": "Quinta-feira",
            "day": "10",
            "hour": "09:00"
        }} 
        />);

        expect(getByText("Lindo")).toBeInTheDocument();
        expect(getByText("banho")).toBeInTheDocument();
        expect(getByText("Junho, 09:00")).toBeInTheDocument();
    });
});
