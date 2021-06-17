import React from "react";
import { render } from "@testing-library/react";
import Routes from "../../routes/Routes";

describe("Routes", () =>
{
    it("should be working", () => 
    {
        render ( <Routes/>);
    });
});
