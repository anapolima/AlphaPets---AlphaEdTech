import React from "react";
import MenuLateral from "../../components/MenuLateral/Menu";
import ScheduleConsults from "../../components/ScheduleConsults/ScheduleConsults";
import { ScheduleConsultsContainer } from "./Style";

function SchedulePage () 
{
    return (
        <ScheduleConsultsContainer>
            < ScheduleConsults/>
            < MenuLateral/>
        </ScheduleConsultsContainer>
    );
}

export default SchedulePage;
