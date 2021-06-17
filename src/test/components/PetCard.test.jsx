import React from "react";
import { render } from "@testing-library/react";
import PetCard from "../../components/PetCard/PetCard";

describe("Pet Card", () =>
{
    it("should render correctly", () =>
    {
        const { getByText } = render ( <PetCard pet={
            {
                "name": "Luna",
                "type": "gato",
                "age": "5",
                "weight": "4",
                "raca": "ND" 
            }
        } />);

        expect(getByText("Luna")).toBeInTheDocument();
        expect(getByText("gato")).toBeInTheDocument();
    });
});
