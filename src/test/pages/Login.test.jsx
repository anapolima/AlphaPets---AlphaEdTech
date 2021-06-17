
import { render } from "@testing-library/react";
import React from "react";
import LoginPage from "../../pages/Login/LoginPage";

describe("Login Page", () =>
{
    it("should be rendered correctly", () =>
    {
        const { getByText } = render(< LoginPage/>);
    
        expect(getByText("Faça o seu login")).toBeInTheDocument();
    });
});
