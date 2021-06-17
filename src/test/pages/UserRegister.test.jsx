import React from "react";
import { render } from "@testing-library/react";
import UserRegister from "../../pages/UserRegister/UserRegister";

describe("User Register Page", () =>
{
    it("should be rendering correctly", () =>
    {
        const { getByText } = render ( <UserRegister/> );

        expect(getByText("Cadastre-se")).toBeInTheDocument();
    });
});
