import React from "react";
import ConsultsList from "../../components/ConsultList/ConsultList";
import MenuLateral from "../../components/MenuLateral/Menu";
import { HomeContainer } from "./Style";

function Home ()
{
    return (
        < HomeContainer>  
            < ConsultsList/>
            < MenuLateral/>
        </HomeContainer>
    );
}

export default Home;
