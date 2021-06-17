import styled from "styled-components";

export const CardStyle = styled.div`
    background-color: #f1faf165;
    transition: ease-out 0.5s all;

    margin-bottom: 15px;

    &:hover{
        background-color: #E0FBE0;
        transition: ease-out 0.5s all;
    }

    display: flex;
    justify-content: flex-start;
    align-items: center;

    width: 380px;
    height: 150px;
    padding: 20px;

    border-radius: 10px;

    .image {
        margin-right: 30px;

        .image-not-found {
            filter: brightness(2.5)
        }
    }

    .pet-name {
        font-size: 26px;
        font-weight: 700;
    }

    .services {
        font-size: 14px;
        margin: 0;
    }

    .month {
        font-size: 16px;
        font-weight: 700;
    }

    .day {
        font-size: 18px;
        font-weight: 700;
    }
`;
