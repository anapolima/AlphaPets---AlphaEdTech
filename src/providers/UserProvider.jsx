import axios from "axios";
import React, { createContext, useCallback, useState } from "react";
import api from "../services/api.js";

export const UserContext = createContext({});

export const UserProvider = (props) =>
{
    const url = "YOUR_IP_ADDRESS";
    const [tryingToRecoverPassword, setTryingToRecoverPassword] = useState([]);
    const [ loggedUser, setLoggedUser ] = useState( () => 
    {
        const logged = localStorage.getItem("@alphapets:loggedUser");

        if (logged)
        {
            return JSON.parse(logged);
        }

        return {};
    });

    const addUserPets = useCallback( async (_pet, _userId) =>
    {
        const { data: userData } = await api.get(`users/${_userId}`);

        if (userData.pets)
        {
            const petId = userData.pets.length + 1;

            const petToAdd = { 
                ..._pet,
                id: petId
            };

            userData.pets.push(petToAdd);

            const updatedUserData = {
                ...userData,
            };

            localStorage.setItem("@alphapets:loggedUser", JSON.stringify(updatedUserData));
            setLoggedUser(updatedUserData);

            api.put(`users/${_userId}`, userData);
        }
        else
        {
            const petId =  1;

            const petToAdd = { 
                ..._pet,
                id: petId
            };
            
            const updatedUserData = {
                ...userData,
                pets: [
                    {
                        ...petToAdd,
                    }
                ]
            };
            
            localStorage.setItem("@alphapets:loggedUser", JSON.stringify(updatedUserData));             
            setLoggedUser(updatedUserData);
            api.put(`users/${_userId}`, updatedUserData);   
        }

    }, [loggedUser]);

    const addNewUser = useCallback( async (_newUserData) =>
    {    
        const { data: storagedUsers } = await api.get("/users"); 

        const userData = {..._newUserData} ;
        userData.id = storagedUsers.length + 1;
        
        if (storagedUsers.length !== 0)
        {
            const emailNotRegistered = storagedUsers.findIndex((user) => user.email === userData.email);

            if (userData.password === userData.confirmPassword && emailNotRegistered === -1)
            {            
                api.post("users", userData);

                const userDataArray = [userData];
                const userToLogin = userDataArray.map(({password, confirmPassword, ...otherData}) => otherData);

                setLoggedUser(userToLogin[0]);

                localStorage.setItem("@alphapets:loggedUser", JSON.stringify(userToLogin[0]));
                
                return [{status: true, result: 0}];
            }
            else
            {
                if (userData.password !== userData.confirmPassword)
                {
                    return {status: false, result: 1};
                }

                if (emailNotRegistered !== -1)
                {   
                    return {status: false, result: 2};
                }
            }
        }
        else
        {
            if (userData.password === userData.confirmPassword)
            {
            
                api.post("users", userData);

                const userDataArray = [userData];
                const userToLogin = userDataArray.map(({password, confirmPassword, ...otherData}) => otherData);

                setLoggedUser(userToLogin[0]);

                localStorage.setItem("@alphapets:loggedUser", JSON.stringify(userToLogin[0]));
                
                return {status: true, result: 0};
            }
            else
            {
                return {status: false, result: 1};
            }
        }
    });

    const addUserConsult = useCallback( async (_newConsult, _userId) => 
    {
        const { data: userData } = await api.get(`users/${_userId}`);
        const {data: dates} = await api.get("schedule");

        dates.forEach( (date) => 
        {
            if (date.month === Number(_newConsult.month) && date.day === _newConsult.day)
            {
                const hoursAvailable = date.hoursAvailable.slice();

                const hourIndex = hoursAvailable.indexOf(_newConsult.hour);

                hoursAvailable.splice(hourIndex, 1);

                const updatedDayData = {
                    ...date,
                    hoursAvailable
                };

                api.put(`/schedule/${date.id}`, updatedDayData);
            }
        });

        if (userData.consults)
        {
            const consultId = userData.consults.length + 1;

            const consultToAdd = {
                ..._newConsult,
                id: consultId
            };

            userData.consults.push(consultToAdd);

            const updatedUserData = {
                ...userData
            };

            setLoggedUser(updatedUserData);
            localStorage.setItem("@alphapets:loggedUser", JSON.stringify(updatedUserData));

            api.put(`users/${_userId}`, updatedUserData);
        }
        else
        {
            const consultId = 1;

            const consultToAdd = {
                ..._newConsult,
                id: consultId
            };

            const updatedUserData = {
                ...userData,
                consults: [
                    {
                        ...consultToAdd
                    }
                ]
            };

            setLoggedUser(updatedUserData);            
            localStorage.setItem("@alphapets:loggedUser", JSON.stringify(updatedUserData));

            api.put(`users/${_userId}`, updatedUserData);
        }

    }, [loggedUser]);

    const userLogin = useCallback ( async (_userData) => 
    {
        const userData = _userData;

        const { data: registeredUsers } = await api.get("/users"); 


        const userIndex = registeredUsers.findIndex( (user) => 
        {
            return user.email === userData.email;
        });

        if ( userIndex !== -1 )
        {
            if (registeredUsers[userIndex].password === userData.password)
            {
                const userToLoginData = [registeredUsers[userIndex]];
                const userToLogin = userToLoginData.map(({password, confirmPassword, ...otherData}) => otherData);

                localStorage.setItem("@alphapets:loggedUser", JSON.stringify(userToLogin[0]));

                setLoggedUser(userToLogin[0]);
                
                return {status: "success"};
            }

            else
            {
                return {status: "error"};
            }
        }
        else
        {
            return {status: "error"};
        }
    }, [loggedUser]);

    const userLogoff = useCallback ( () =>
    {
        localStorage.clear();
        setLoggedUser({});
    }, [loggedUser]);

    const resetPassword = useCallback ( async (_emailToResetPassword) =>
    {
        const { data: registeredUsers } = await api.get("/users");
        registeredUsers.forEach( (user) =>
        {
            if (user.email === _emailToResetPassword)
            {
                const maxLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M" ,"N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
                const minLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m" ,"n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
                const specialCaracteres = [".", "/", "?", "!", "#", "&", "$", "+", "-", "%", "@", ":", ";", "[", "]", "{", "}", "=", "_"];
                const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        
                const allCaracteres = [...maxLetters, ...minLetters, ...specialCaracteres, ...numbers];
        
                for (let index = allCaracteres.length; index; index--)
                {
                    const aleatoryIndex = Math.floor(Math.random() * index);
        
                    const element = allCaracteres[index - 1];
        
                    allCaracteres[index - 1] = allCaracteres[aleatoryIndex];
        
                    allCaracteres[aleatoryIndex] = element;
                }
        
                const shuffledArray = [...allCaracteres];
        
                const preCode = [];
        
                while (preCode.length < 20)
                {
                    const aleatoryIndex = Math.floor(Math.random() * (shuffledArray.length - 2 + 1));
        
                    preCode.push(shuffledArray[aleatoryIndex]);
                }
                const code = preCode.join("");

                const dataToSendEmail = {
                    email: _emailToResetPassword,
                    code: code
                };

                axios.post(`http://${url}:8989/send`, dataToSendEmail);
                const solicitationTimeout = Math.trunc(+ new Date() / 1000) + (1800);

                setTryingToRecoverPassword({
                    id: user.id,
                    email: _emailToResetPassword,
                    code: code,
                    solicitationTimeout: solicitationTimeout 
                });
            }
            else
            {
                return {status: false, result: 1};
            }
        });
    });

    const setNewPassword = useCallback ( async (_userId, _password, _confirmPassword) => 
    {
        const { data: userData } = await api.get(`/users/${_userId}`);

        if (_password === _confirmPassword)
        {
            const updateUserData = {
                ...userData,
                password: _password,
                confirmPassword: _confirmPassword
            };

            api.post(`/users/${_userId}`, updateUserData);

            if (loggedUser.email)
            {
                setLoggedUser(updateUserData);
            }
            else
            {
                return [{status: true, result: 0}];
            }

            return [{status: true, result: 0}];
        }
        else
        {
            return {status: false, result: 1};
        }

    }, [tryingToRecoverPassword]);
    
    return (
        < UserContext.Provider value={ 
            {
                addUserPets,
                addNewUser,
                userLogin,
                userLogoff,
                addUserConsult,
                resetPassword,
                setNewPassword,
                tryingToRecoverPassword,
                loggedUser
            }
        }>
            {props.children}
        </ UserContext.Provider>
    );
};
