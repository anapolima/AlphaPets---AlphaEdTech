import styled from "styled-components";

export const LoginStyle = styled.div `

    width: 100%;
    display: flex;
    justify-content: space-between;

    padding-top: 70px;
    padding-left: 100px;
    padding-right: 100px;

    h1 {
        font-size: 52px;

        color: #FDF9E4;

        margin-bottom: 32px;
    }

    .left-login-content {
        max-width: 550px;
        width: 100%;
    }

    form {
        display: flex;
        flex-direction: column;

        width: 100%;

        input {
            font-family: "Nunito";
            font-size: 16px;
            text-indent: 20px;
            color: #fcf1ca;

            margin: 8px 0px;
            height: 50px;
            background-color: var(--conteiner);

            width: 100%;

            border-bottom: 1px solid #fcf1ca;

            &:focus {
                outline: none;
                border-bottom: 3px solid #fcf1ca;;
            }

            ::-webkit-input-placeholder { /* Edge */
            color: #fcf1ca;
            }

            :-ms-input-placeholder { /* Internet Explorer 10-11 */
            color: #fcf1ca;
            }

            ::placeholder {
            color: #fcf1ca;
}
        }

        button {
            height: 50px;
            cursor: pointer;

            background-color: #fcf1ca8b;
            border-radius: 10px;

            margin-top: 16px;

            font-size: 16px;
            font-weight: 700;
            color: #855C24;

            transition: ease-out 0.5s all;

            &:hover {
                background-color: #fcf1ca;
                transition: ease-out 0.5s all;
            }
        }
    }

    .go-back {
        p {
            margin-top: 18px;
            margin-right: 200px;
            font-size: 22px;
            color: #FDF9E4 !important;
    
            &:hover {
                cursor: pointer;
                text-decoration: underline;
            }
        }
    }

    .block {
        width: 100%;
        max-width: 550px;

        button {
            width: inherit;
        }
    }

    .links-block {
        width: 100%;
        max-width: 550px;
        margin-top: 15px;

        display: flex;
        justify-content: space-evenly;

        font-weight: 700;
        color: #FDF9E4;

        p {
            &:hover {
                text-decoration: underline;
                cursor: pointer;
            }
        }
    }
    
    .error-message {
        color: #93225D;
    }

`;
