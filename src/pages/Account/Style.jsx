import styled from "styled-components";
import backgroundImage from "../../images/puppie.jpeg";

export const AccountInfotmationStyle = styled.div `
    background-image: url(${backgroundImage}) !important;
    background-size: cover;
    height: 100vh;

    display: flex;
    justify-content: space-between;

    padding-left: 150px;

    color: #FAEAD1;

    h1 {
        font-size: 52px;
        padding-top: 70px;
        margin-bottom: 32px;

    }

    .user-name {
        font-size:32px;
        font-weight: 700;
    }

    .user-email {
        margin-top: 5px;
        font-size: 20px;
        margin-bottom: 20px;

    }

    .registered-pets,
    .scheduled-consults {
        margin-top: 5px;
        font-size:20px;

        span {
            font-weight: 700;
        }
    }

    .change-password {
        margin-top: 40px;
        font-size: 14px;
        width: 90px;

        &:hover {
            text-decoration: underline;
            cursor: pointer;
        }
    }

    button {
        width: 100%;
        max-width: 350px;
        height: 50px;

        margin-top: 20px;

        border-radius: 10px;

        font-size: 16px;
        font-weight: 700;
        font-family: "Nunito";
        color: #5F1809;

        background-color: #faead17b;
        transition: ease-out 0.5s all;
        cursor: pointer;

        &:hover {
            background-color: #FAEAD1;
            transition: ease-out 0.5s all;
        }
    }
    .go-back {
        p {
            margin-top: 92px;
            margin-right: 400px;
            font-size: 22px;
            color: #FAEAD1 !important;
    
            &:hover {
                cursor: pointer;
                text-decoration: underline;
            }
        }
    }
`;
