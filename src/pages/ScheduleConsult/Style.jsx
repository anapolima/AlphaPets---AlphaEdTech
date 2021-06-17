import styled from "styled-components";
import backgroundImage from "../../images/green-dog.jpg";

export const ScheduleConsultsContainer = styled.div `
    background-image: url(${backgroundImage}) !important;
    background-size: cover;

    display: flex;
    justify-content: space-between;

    height: 100vh;

    font-size: 16px;
    color: #105B4B;
`;
