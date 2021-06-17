import styled from "styled-components";

export const MenuStyle = styled.div `
    margin-right: 150px;
    margin-top: 100px;

    height: 50vh;

    display: flex;
    flex-direction: column;

    button {
        margin-bottom: 32px;
        width: 300px;
        height: 50px;

        font-size: 16px;
        font-weight: 800;
        color: #105B4B;

        border-radius: 10px;

        background-color: #f1faf165;
        cursor: pointer;

        transition: ease-out 0.5s all;

        &:hover {
            transition: ease-out 0.5s all;

            background: #E0FBE0;
        }
    }
`;
