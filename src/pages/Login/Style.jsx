import styled from "styled-components";
import backgroundImage from "../../images/banana-dog.jpg";

export const LoginStyle = styled.div `
    background-image: url(${backgroundImage}) !important;
    background-size: cover;
    background-repeat: no-repeat;

    display: flex;
    flex-direction: row;

    justify-content: space-between;
    height: 100vh;
    max-width: 100vw;
`;
