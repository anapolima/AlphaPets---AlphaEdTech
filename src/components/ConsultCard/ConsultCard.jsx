import React from "react";
import { CardStyle } from "./Style";
import petImage from "../../images/image-not-found.jpg";

function ConsultCard ( { consult } ) 
{    
    return (
        < CardStyle>
            <div className="image">
                {
                    consult.petImage ? 
                        <img src={consult.petImage} alt={consult.petName} height="150px" width="200px"/>
                        :
                        <img className="image-not-found" src={petImage} alt={consult.petName} height="150px" width="200px"/>

                }
            </div>

            <div>
                <p className="pet-name">{consult.petName}</p>

                {
                    consult.services.map ( (service) => 
                    {
                        return <p className="services" key={service}>{service}</p>;
                    })
                }

                <div className="date-time">
                    <p className="month">{consult.monthName}, {consult.hour}</p>
                    <p className="day">{consult.day}, {consult.weekDay}</p>
                </div>
            </div>
        </CardStyle>
    );
}

export default ConsultCard;
