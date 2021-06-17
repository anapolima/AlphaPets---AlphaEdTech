import React from "react";
import { fireEvent, render } from "@testing-library/react";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import { useUser } from "../../hooks/UserProvider";

jest.mock("../../hooks/useHistory.js", () =>
{
    return {
        UseHistory ()
        {
            return {
                push: jest.fn(),
                goBack: jest.fn()
            };
        }
    };
});

const mockedUseUser = useUser;

jest.mock("../../hooks/UserProvider.js");

describe("Forgot Password Page", () =>
{
    it("should be rendering correctly", () =>
    {
        mockedUseUser.mockReturnValue({
            resetPassword: jest.fn()
        });

        const { getByTestId, getByText } = render( <ForgotPassword/> );
        
        const email = getByTestId("test-email-recover");
        
        const submitButton = getByTestId("test-submit-button");
        const goBack = getByTestId("test-go-back-button");

        fireEvent.change(email, {target: {value: "anapaula@gmail.com"}});

        fireEvent.click(submitButton);
        fireEvent.click(goBack);

        expect(getByText("Esqueceu a sua senha?")).toBeInTheDocument();
    }); 
});
