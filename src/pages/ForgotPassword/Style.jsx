import styled from "styled-components";
import backgroundImage from "../../images/red-one-dog.jpg";

export const ForgotContainer = styled.div `
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
        
        margin-bottom: 32px;
    }
    
    input {
        width: 400px;
        height: 50px;
        
        color: #fbe6da;
        background-color: transparent;
        border-bottom: 1px solid #FBE6DA;

        text-indent: 20px;
        font-size: 16px;
        font-family: "Nunito";

        margin-bottom: 24px;

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
            border-bottom: 3px solid #FBE6DA;
        }
    }

    button {
        width: 400px;
        height: 50px;
        border-radius: 10px;

        color: #5B0C25;
        font-size: 16px;
        font-weight: 700;

        cursor: pointer;

        background-color:#fbe6da84;
        transition: ease-out 0.5s all;

        &:hover {
            transition: ease-out 0.5s all;
            background-color: #FBE6DA
        }
    }

    form {
        display: flex;
        flex-direction: column;
    }

    .go-back {
        p {
            margin-top: 88px;
            margin-right: 400px;
            font-size: 22px;
            color: #FBE6DA;
    
            &:hover {
                cursor: pointer;
                text-decoration: underline;
            }
        }
    }
`;
