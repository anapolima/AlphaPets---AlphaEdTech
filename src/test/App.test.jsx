import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

describe("App.js", () =>
{
    it("should be working", () => 
    {
        render(<App/>);
    });
});
