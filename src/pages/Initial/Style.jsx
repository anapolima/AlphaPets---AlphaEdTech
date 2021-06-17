import styled from "styled-components";
import backgroundImage from "../../images/cat-right-side.jpg";


export const InitialContainer = styled.div `
    background-image: url(${backgroundImage}) !important;
    background-size: cover;

    display: flex;
    align-items: center;

    height: 100vh;

    .content {
        margin-left: 110px;

        display: flex;
        flex-direction: column;

        h1 {
            font-size: 52px;
            margin-bottom: 70px;

            color: #14131b;
        }

        .btn {
            font-size: 16px;
            font-weight: 700;

            width: 300px;

            padding: 20px 20px;
            border-radius: 10px;

            margin: 10px 0px;

            cursor: pointer;
        }

        .btn-register {
            /* background-color: rgb(240, 229, 229)	; */
            background-color: rgb(227, 229, 235);

            transition: ease-out 0.5s all; 

            color: #14131b;

            &:hover {
                color: #14131b;
                background-color: rgb(207, 211,	217)	;

                transition: ease-out 0.5s all; 
            }
        }

        .btn-login {
            color: #14131b;
            background-color: rgb(207, 211,	217)	;
            transition: ease-out 0.5s all; 

            &:hover {

                background-color: #14131b;

                color: #e8ebf1;

                transition: ease-out 0.5s all; 
            }
        }
    }
`;
