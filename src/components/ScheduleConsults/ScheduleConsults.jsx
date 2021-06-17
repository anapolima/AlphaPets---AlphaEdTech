import React, { useCallback, useEffect, useState } from "react";
import { useUser } from "../../hooks/UserProvider";
import api from "../../services/api";
import { ScheduleConsultsContainer } from "./Style";

function ScheduleConsults () 
{
    const [petName, setPetName] = useState("");
    const [services, setServices] = useState([]);
    const [month, setMonth] = useState(0);
    const [monthName, setMonthName] = useState("");
    const [day, setDay] = useState("");
    const [weekDay, setWeekDay] = useState("");
    const [time, setTime] = useState("");

    const [message, setMessage] = useState("");

    const { loggedUser, addUserConsult } = useUser();

    const [availableMonths, setAvailableMonths] = useState([]);
    const [availableDays, setAvailableDays] = useState([]);
    const [availableHours, setAvailableHours] = useState([]);

    useEffect( async () =>
    {
        const {data: dates} = await api.get("/schedule");

        const notEqualMonths = [];

        const todayDate = new Date();
        const currentMonth = todayDate.getMonth();

        dates.forEach( (date, index) => 
        {
            if (index === 0 && date.month >= currentMonth)
            {
                notEqualMonths.push(date);
            }
            else
            {
                if (date.month !== dates[index - 1].month && date.month >= currentMonth)
                {
                    notEqualMonths.push(date);
                }
            }
        });

        setAvailableMonths(notEqualMonths);
    }, [loggedUser]) ;

    useEffect( async () =>
    {
        const {data: dates} = await api.get("/schedule");

        const daysOnThatMonth = [];

        const todayDate = new Date();
        const currentDay = todayDate.getDate();
        const currentMonth = todayDate.getMonth() + 1;

        dates.forEach( (date) => 
        {
            if (date.month === Number(month))
            {
                if (date.month === currentMonth)
                {
                    if (Number(date.day) > currentDay)
                    {
                        daysOnThatMonth.push(date);
                    }
                }
                else
                {
                    daysOnThatMonth.push(date);
                }
            }
        });

        setAvailableDays(daysOnThatMonth);
    }, [month, availableMonths]);

    useEffect( async () =>
    {
        const {data: dates} = await api.get("/schedule");

        dates.forEach( (date) => 
        {
            if (date.month === Number(month) && date.day === day)
            {
                const hoursOnThatDay = date.hoursAvailable.slice();

                setAvailableHours(hoursOnThatDay);
                setWeekDay(date.weekDay);
                setMonthName(date.monthName);
            }
        });
        
    }, [day, availableDays]);

    const handleFormSubmition = useCallback( (event) =>
    {
        event.preventDefault();

        if (petName === "null" ||  month === "null" || day === "null" ||  time === "null" || services.length === 0)
        {
            setMessage("Você esqueceu de preencher alguns campos");
        }
        else
        {
            setMessage("Consulta agendada com sucesso!");

            let petImage = "";
            loggedUser.pets.forEach( (pet) =>
            {
                if (pet.name === petName)
                {
                    petImage = pet.image;
                }
            });

            console.log(petImage);
            const consultData = {
                petName: petName,
                petImage: petImage,
                services: services,
                month: month,
                monthName: monthName,
                weekDay: weekDay,
                day: day,
                hour: time,
            };

            addUserConsult(consultData, loggedUser.id);
        }
    }, [petName, services, month, day, time] );

    const handleServices = useCallback ((_service) =>
    {
        const service = _service;
        const copyServices = services.slice();
        const index = copyServices.indexOf(service);

        if ( index !== -1 )
        {
            copyServices.splice(index, 1);
            setServices(copyServices);
        }
        else
        {
            copyServices.push(service);
            setServices(copyServices);
        }
    }, [services]);

    return (
        < ScheduleConsultsContainer>

            <div className="schedule-form">
                <h1>Agende uma consulta</h1>

                <form onSubmit={handleFormSubmition}>
                    <div className="schedule-block">
                        <p>Amigunho</p>
                        <select 
                            required
                            data-testid="test-choose-pet"
                            onChange={ (event) => setPetName(event.target.value)}>

                            <option value="null" >- Escolha um amiguinho -</option>
                            {
                                loggedUser.pets && loggedUser.pets.length > 0 ? loggedUser.pets.map( (pet) => 
                                {
                                    return  <option value={pet.name} key={pet.id}>{pet.name}</option>;
                                }) 
                                    :  <option value="null">Nenhum pet foi cadastrado</option>
                            }
                        </select>
                    </div>

                    <div className="schedule-block">
                        <p>Serviço(s)</p>

                        <div className="service-checkbox">
                            <input type="checkbox"
                                name="tosa"
                                id="tosa"
                                value="tosa"
                                data-testid="test-choose-tosa"
                                onClick={(event) => handleServices(event.target.value)}/>
                            <label htmlFor="tosa"> Tosa</label>
                        </div>

                        <div className="service-checkbox">
                            <input
                                type="checkbox"
                                name="banho"
                                id="banho"
                                value="banho"
                                data-testid="test-choose-bath"
                                onClick={(event) => handleServices(event.target.value)} />
                            <label htmlFor="banho"> Banho</label>
                        </div>

                        <div className="service-checkbox">
                            <input
                                type="checkbox"
                                name="clinico"
                                id="clinico"
                                value="clinico"
                                data-testid="test-choose-clinico"
                                onClick={(event) => handleServices(event.target.value)} />
                            <label htmlFor="clinico"> Atendimento clínico</label>
                        </div>
                    </div>

                    <div className="schedule-block">
                        <p>Mês</p>
                        <select
                            name="month"
                            id="month"
                            data-testid="test-choose-month"
                            onChange={ (event) => setMonth(event.target.value) } required>

                            <option value="null">- Escolha um mês -</option>

                            {
                                availableMonths ? 
                                    availableMonths.map( (date) =>
                                    {
                                        return <option value={date.month} key={date.id}>{date.monthName}</option>;
                                    })
                                    : <option value="null">Não há datas disponíveis</option>
                            }
                        </select>
                    </div>

                    { month ? 
                        <div className="schedule-block">
                            <p>Dia</p>
                            <select
                                name="day"
                                id="day"
                                data-testid="test-choose-day"
                                onChange={ (event) => setDay(event.target.value) } required>

                                <option value="null" >- Escolha um dia -</option>

                                {
                                    availableDays ? 
                                        availableDays.map( (date) =>
                                        {
                                            return <option value={date.day} key={date.id}>{date.day}, {date.weekDay}</option>;
                                        })
                                        : <option value="null">Não há datas disponíveis</option>
                                }
                            </select>
                        </div>

                        : ""
                    }

                    { 
                        day ? 
                            <div className="schedule-block">
                                <p>Hora</p>
                                <select
                                    name="hour"
                                    id="hour"
                                    data-testid="test-choose-hour"
                                    onChange={ (event) => setTime(event.target.value) } required>

                                    <option value="null" >- Escolha um horário -</option>

                                    {
                                        availableHours ?
                                            availableHours.map( (hour, index) =>
                                            {
                                                return (<option value={hour} key={index}>{hour}</option>);
                                            })
                                            
                                            : <option value="null">Não há horários disponíveis</option>
                                    }
                                </select>
                            </div> 
                            : ""
                    }

                    {
                        time ?
                            <div className="block-with-message">
                                { message ? <p className="error-message">{message}</p> : ""}
                                <button
                                    type="submit"
                                    data-testid="test-submit-consult">Agendar consulta</button>
                            </div>            
                            : ""
                    }

                </form>
            </div>

        </ScheduleConsultsContainer>
    );
}

export default ScheduleConsults;
