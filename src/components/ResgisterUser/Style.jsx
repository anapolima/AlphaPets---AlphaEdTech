import styled from "styled-components";

export const Register = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;

    form {
        display: flex;
        flex-direction: column;
        vertical-align: center;
        
        width: 100%;
        max-width: 600px;

        padding: 70px 150px;

    }

    input {
        height: 40px;
        text-indent: 20px;
        color: #71262A;
        margin: 8px 0px;
        font-size: 16px;
        vertical-align: middle;

        background-color: inherit;

        border-bottom: 1px solid #71262A;

        &:focus {
            outline: none;
            border-bottom: 3px solid #71262A;
        }

        ::-webkit-input-placeholder { /* Edge */
        color: #71262A;
        }

        :-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #71262A;
        }

        ::placeholder {
        color: #71262A;
        }
    }

    .block {
        height: 66px;

        margin-bottom: 16px;

        width: inherit;

        > input {
            width: inherit;
        }
    }

    button {
        height: 50px;
        margin-top: 8px;

        font-size: 18px;
        font-weight: 700;
        color: #71262A;
        
        cursor: pointer;
        
        background-color: #fefaf54e;
        border-radius: 10px;

        transition: ease-out 0.5s all;

        &:hover {
            background-color: #FEFAF5;
            transition: ease-out 0.5s all;
        }
    }

    h1 {
        color: #71262A;
        font-size: 48px;
        margin-bottom: 20px;
    }

    .go-back {
        p {
            margin-top: 90px !important;
            margin-right: 400px !important;
            font-size: 22px !important;
            color: #71262A !important;
    
            &:hover {
                cursor: pointer;
                text-decoration: underline;
            }
        }
    }

    .link {
        text-align: center;
        font-weight: 700;
        color: #71262A;

        margin-top: 15px;

        &:hover {
            text-decoration: underline;
            cursor: pointer;
        }
    }

    .error-message {
        color: #932D64;
    }
`;
