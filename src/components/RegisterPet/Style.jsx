import styled from "styled-components";

export const RegisterPetsForm = styled.div `
    display: flex;
    flex-direction: column;
    background-color: inherit;

    padding-left: 100px;

    width: 100%;
    max-width: 550px;

    input {
        height: 50px;
        outline: none;

        font-size: 16px;
        font-family: "Nunito";
        text-indent: 20px;
        color: #E1F6F9;

        background-color: transparent;

        border-bottom: 1px solid #E1F6F9;
        margin: 8px 0px;

        &:focus {
            border-bottom: 3px solid #E1F6F9;
        }

        ::-webkit-input-placeholder { /* Edge */
        color: #E1F6F9;
        }

        :-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #E1F6F9;
        }

        ::placeholder {
        color: #E1F6F9;
        }
    }

    button {
        height: 50px;
        width: 100%;
        max-width: 550px;
        margin-top: 5px;

        background-color: #e1f6f953;
        border-radius: 10px;

        cursor: pointer;

        font-size: 16px;
        font-family: "Nunito";
        font-weight: 700;
        color: #0E2344;

        transition: ease-out 0.5s all;

        &:hover {
            background-color: #E1F6F9;
            transition: ease-out 0.5s all;
        }
    }

    .block-with-message {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        width: 100%;
        max-width: 550px;

        height: 90px;
    }

    .error-message {
        color: #FBCF9E;
    }

    .image-container {
        
        img {
            margin-right: 60px;
            width: 105px;
            height: 80px;
        }
    }

    .dropzone-container {
        width: 100%;
        max-width: 518px;
        height: 95px;

        display: flex;
        justify-content: flex-start;
        align-items: center;

        padding: 0 16px;
        margin: 15px 0 0;
        border: 2px dotted #e1f6f996;
        border-radius: 10px;
        cursor: pointer;

        color: #E1F6F9;
    }

    section {
        width: 146px;
        display: flex;
        align-items: center;
    }
`;

export const ButtonHome = styled.p `
    > p {
        margin-top: 85px;
        margin-right: 400px;

        font-size: 24px;
        font-weight: 600;

        color: #E1F6F9;

        cursor: pointer;

        transition: ease-out 0.5s all;

        &:hover {
            transition: ease-out 0.5s all;

            text-decoration: underline;
        }
    }
`;
