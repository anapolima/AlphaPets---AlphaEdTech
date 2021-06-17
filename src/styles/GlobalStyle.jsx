import { createGlobalStyle } from "styled-components";

export default createGlobalStyle `
    :root {
        --background: #c8e3d3;
        --primary: #375E47;
        --secondary: #63AB81;
        --extra: #535E58;
        --container: #f2f2f2;
        --error: #C97D73;
    }

    * {
        margin: 0;
        padding: 0;
        border: none;
        list-style: none;
        font-family: "Nunito";
    }
    
    /* body {
        background-color: var(--background);
    } */

    .error-message {
        text-align: center;
        color: var(--error);
        margin-bottom: 0px;

    }
`;
