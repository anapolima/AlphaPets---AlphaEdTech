import styled from "styled-components";
import backgroundImage from "../../images/blu-cat.jpg";

export const PetRegisterStyle = styled.div `
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    width: 100%;
    margin: 0 auto;

    background-image: url(${backgroundImage}) !important;
    background-size: cover;
    
    min-height: 100vh;
    max-width: 100vw;
    
    h1 {
        color: #E1F6F9;
        font-size: 42px;

        padding: 70px 100px 0px;
        margin-bottom: 32px;
    }
`;
