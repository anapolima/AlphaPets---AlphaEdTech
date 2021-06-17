import styled from "styled-components";

export const ScheduleConsultsContainer = styled.div `
    .schedule-form {
        padding-top: 70px;
        margin-left: 150px;

        width: 450px;

        font-weight: 800;

        h1 {
            font-size: 42px;
            color: #E0FBE0;

            margin-bottom: 32px;
        }

        select {
            font-size: 16px;
            font-weight: 800;
            color: #105B4B;

            max-width: 330px;
            width: 100%;

            background-color: transparent;

            &:focus {
                outline: none;
            }
        }

        button {
            max-width: 330px;
            width: 100%;
            height: 50px;
            margin-top: 5px;

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
    }

    .schedule-block {
        display: flex;
        flex-direction: column;

        max-width: 350px;
        width: 100%;

        margin-bottom: 28px;

        p {
            font-size: 24px;
            font-weight: 700;

            color: #C2F8C7;
        }
    }

    .service-checkbox {
        input:checked:after {
            background-color: #105B4B;
        }
    }
  
    .block-with-message {
        width: 100%;
        max-width: 330px;
    }

    .error-message {
        font-weight: 400;
        color: #7A0914;
        text-align: center;
        text-indent: 0;
    }
`;
