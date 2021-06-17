import styled from "styled-components";
import backgroundImage from "../../images/red-two-dogs.jpg";

export const ResetPasswordStyle = styled.div `
    background-image: url(${backgroundImage}) !important;
    background-size: cover;

    display: flex;
    justify-content: space-between;

    height: 100vh;

    padding-left: 150px;

    h1 {  
        font-size: 42px;
        padding-top: 70px;
        
        color: #FBE6DA;
        max-width: 650px;
        
        margin-bottom: 32px;
    }

    input {
        height: 50px;

        background-color: transparent;

        font-size: 16px;
        font-family: "Nunito";
        text-indent: 20px;
        color: #fbe6da;

        border-bottom: 1px solid #fbe6da;
        margin-bottom: 4px;

        ::-webkit-input-placeholder { /* Edge */
            color: #FBE6DA;
        }

        :-ms-input-placeholder { /* Internet Explorer 10-11 */
            color: #FBE6DA;
        }

        ::placeholder {
            color: #FBE6DA;
        }

        &:focus {
            outline: none;
            border-bottom: 3px solid #fbe6da;
        }
    }

    .block {
        display: flex;
        flex-direction: column;
        height: 60px;

        width: 100%;
        max-width: 400px;
        margin-bottom: 10px;

        .error-message {
            color: #F9CB9F;
        }
    }

    .new-password {
        height: 150px;

        > form {
            display: flex;
            flex-direction: column;
            height: 110px;

            width: 100%;
            max-width: 400px;
        }
    }

    button {
        max-width: 400px;
        width: 100%;
        height: 50px;
        border-radius: 10px;

        font-size: 16px;
        font-weight: 600;
        color: #5B0C25;

        background-color: #fbe6da84;
        cursor: pointer;
        transition: ease-out 0.5s all;

        &:hover {
            background-color: #fbe6da;
            transition: ease-out 0.5s all;
        }
    }

    .go-back {
        p {
            margin-top: 88px;
            margin-right: 350px;
            font-size: 22px;
            color: #FBE6DA;
    
            &:hover {
                cursor: pointer;
                text-decoration: underline;
            }
        }
    }
`;
