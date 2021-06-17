import React from "react";
import { render } from "@testing-library/react";
import PetRegister from "../../pages/PetRegister/PetRegister";

describe("Pets Register Page", () =>
{
    it("should be rendering correctly", () =>
    {
        const { getByText } = render(<PetRegister/>);

        expect(getByText("Adicionar novo amiguinho")).toBeInTheDocument();
    });
});
