import styled from "styled-components";

export const ListStyle = styled.div `
    margin-top: 70px;
    margin-left: 150px;

    display: flex;
    flex-direction: column;

    h1 {
        font-size: 42px;
        color: #E0FBE0;

    }
    
    .title {
        margin-bottom: 32px;
        max-width: 430px;
        display: flex;

        justify-content: space-between;
        align-items: center;
    }

    .icon {
        color: #f1faf165;
        width: 30px;
        height: 30px;
        
        transition: ease-out 0.5s all;

        &:hover {
            color: #E0FBE0;
            cursor: pointer;
            transition: ease-out 0.5s all;
        }
    }
`;
