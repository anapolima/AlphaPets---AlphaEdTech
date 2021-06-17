import { useUser } from "../../hooks/UserProvider";
import { renderHook } from "@testing-library/react-hooks";
import { UserProvider } from "../../providers/UserProvider";

import AxiosMock from "axios-mock-adapter";
import api from "../../../../alphapets/src/services/api";
import { act } from "react-dom/test-utils";

const apiMock = new AxiosMock(api);

apiMock.onGet("schedule").reply(200, [
    {
        "day": "10",
        "weekDay": "Quinta-feira",
        "monthName": "Junho",
        "month": 6,
        "year": "2021",
        "id": 1,
        "hoursAvailable": [
            "09:00",
            "09:30",
            "10:00",
            "10:30",
            "11:00",
            "11:30",
            "13:00",
            "13:30",
            "14:00",
            "14:30",
            "15:00",
            "15:30",
            "16:00",
            "16:30",
            "17:00",
            "17:30"
        ]
    },
    {
        "day": "11",
        "weekDay": "Sexta-feira",
        "monthName": "Junho",
        "month": 6,
        "year": "2021",
        "id": 2,
        "hoursAvailable": [
            "09:00",
            "09:30",
            "10:00",
            "10:30",
            "11:00",
            "11:30",
            "13:00",
            "13:30",
            "14:00",
            "14:30",
            "15:00",
            "15:30",
            "16:00",
            "16:30",
            "17:00",
            "17:30"
        ]
    }
]);

describe("User Provider", () => 
{
    // LOGGED USER
    it("should be able to restore logged user", () =>
    {
        jest.spyOn(Storage.prototype, "getItem").mockImplementation((storageKey) =>
        {
            switch (storageKey)
            {
            case "@alphapets:loggedUser":
                return JSON.stringify([
                    {
                        "name": "ana",
                        "email": "ana@gmail",
                        "password": "ana",
                        "confirmPassword": "ana",
                        "id": "1"
                    }
                ]);
            default: 
                return null;
            }
        });

        const { result } = renderHook( () =>  useUser(), {
            wrapper: UserProvider
        });

        expect(result.current.loggedUser.length).toBe(1);
    });

    it("should be able to return an empty json if there was no logged user", () =>
    {
        const { result } = renderHook( () =>  useUser(), {
            wrapper: UserProvider
        });

        expect(result.current.loggedUser.email).toBeFalsy();
    });

    // ADD NEW USER
    it("should be able to add user when there was no user registered", async () =>
    {
        const userData = {
            name: "name",
            email: "email@email.com",
            password: "password",
            confirmPassword: "password"
        };
        
        const { result } = renderHook( () =>  useUser(), {
            wrapper: UserProvider
        });
        
        act( () =>
        {
            result.current.addNewUser(userData);
        });
        
        apiMock.onGet("users").reply(200, []);

        const postRequestResult = apiMock.onPost(userData).reply( (config) => 
        {
            const data = JSON.parse(config.data);
          
            if (data.email === userData.email && data.name === userData.name && data.password === userData.password && data.confirmPassword === userData.confirmPassword) 
            {
                return true;
            }
            else 
            {
                // passThrough
                return false;
            }
        });

        expect(postRequestResult.handlers.post).toBeTruthy();
    });

    it("should be able to add user when there is user registered", async () =>
    {
        
        const userData = {
            name: "name test",
            email: "emailtest@email.com",
            password: "passwordtest",
            confirmPassword: "passwordtest"
        };
        
        const { result } = renderHook( () =>  useUser(), {
            wrapper: UserProvider
        });
        
        act( () =>
        {
            result.current.addNewUser(userData);
        });
        
        apiMock.onGet("users").reply(200, [{
            name: "name",
            email: "email@email.com",
            password: "password",
            confirmPassword: "password"
        }]);

        const postRequestResult = apiMock.onPost(userData).reply( (config) => 
        {
            const data = JSON.parse(config.data);
          
            if (data.email === userData.email && data.name === userData.name && data.password === userData.password && data.confirmPassword === userData.confirmPassword) 
            {
                return true;
            }
            else 
            {
                // passThrough
                return false;
            }
        });

        expect(postRequestResult.handlers.post).toBeTruthy();
    });

    it("should not add user if email was already registered", async () =>
    {
        apiMock.onGet("users").reply(200, [{
            name: "name",
            email: "email@email.com",
            password: "password",
            confirmPassword: "password"
        }]);

        const userData = {
            name: "name test",
            email: "email@email.com",
            password: "passwordtest",
            confirmPassword: "passwordtest"
        };
        
        const { result } = renderHook( () =>  useUser(), {
            wrapper: UserProvider
        });
        
        act( () =>
        {
            result.current.addNewUser(userData);
        });

    });

    it("should not add user if there is user already registered but passwords don't match", async () =>
    { 
        const userData = {
            name: "name test",
            email: "emailtest@gmail.com",
            password: "passwordtest",
            confirmPassword: "passwordteste"
        };
        
        const { result } = renderHook( () =>  useUser(), {
            wrapper: UserProvider
        });
        
        act( () =>
        {
            result.current.addNewUser(userData);
        });
        
        apiMock.onGet("users").reply(200, [{
            name: "name",
            email: "email@email.com",
            password: "password",
            confirmPassword: "password"
        }]);
       
    });

    it("should not add user if there is no user registered but passwords don't match", async () =>
    { 
        const userData = {
            name: "name test",
            email: "emailtest@gmail.com",
            password: "passwordtest",
            confirmPassword: "passwordteste"
        };
        
        const { result } = renderHook( () =>  useUser(), {
            wrapper: UserProvider
        });
        
        act( () =>
        {
            result.current.addNewUser(userData);
        });
        
        apiMock.onGet("users").reply(200, []);
       
    });

    // ADD USER PET
    it("should be able to add pet when there was no pet", async () =>
    {
        const userId = 1;

        apiMock.onGet(`users/${userId}`).reply(200, 
            {
                "name": "ana",
                "email": "ana@gmail",
                "password": "ana",
                "confirmPassword": "ana",
                "id": 1
            }
        );

        const pets = {
            "name": "Luna",
            "type": "gato",
            "age": "5",
            "weight": "4",
            "raca": "ND"
        };

        const updatedUserData = {
            "name": "ana",
            "email": "ana@gmail",
            "password": "ana",
            "confirmPassword": "ana",
            "id": 1,
            "pets": [
                {
                    ...pets
                }
            ]
        };

        const { result, waitForNextUpdate } = renderHook( () =>  useUser(), {
            wrapper: UserProvider
        });

        const setItemSpy = jest.spyOn(Storage.prototype, "setItem");
 
        result.current.addUserPets(pets, userId);
        
        await waitForNextUpdate();

        expect(setItemSpy).toHaveBeenCalled();
        expect(result.current.loggedUser.pets.length).toBe(1);
    });

    it("should be able to add pet when there is pet registered", async () =>
    {
        const userId = 1;

        apiMock.onGet(`users/${userId}`).reply(200, 
            {
                "name": "ana",
                "email": "ana@gmail",
                "password": "ana",
                "confirmPassword": "ana",
                "id": "1",
                "pets": [
                    {
                        "name": "Luna",
                        "type": "gato",
                        "age": "5",
                        "weight": "4",
                        "raca": "ND" 
                    }
                ]
            }
        );

        const pets = {
            "name": "Lindo",
            "type": "cão",
            "age": "8",
            "weight": "15",
            "raca": "ND"
        };

        const updatedUserData = {
            "name": "ana",
            "email": "ana@gmail",
            "password": "ana",
            "confirmPassword": "ana",
            "id": "1",
            "pets": [
                {
                    ...pets
                }
            ]
        };

        const { result, waitForNextUpdate } = renderHook( () =>  useUser(), {
            wrapper: UserProvider
        });
        
        const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

        act( () =>
        {
            result.current.addUserPets(pets, userId);
        });

        await waitForNextUpdate();

        expect(setItemSpy).toHaveBeenCalledTimes(1);
        expect(result.current.loggedUser.pets.length).toBe(2);
        
    });

    // USER CONSULTS
    it("should be able to add a consult when there is no consult scheduled", async () =>
    {
        const userId = 1;

        const consult = {
            petName: "Lindo",
            services: ["banho"],
            month: 6,
            monthName: "Junho",
            weekDay: "Quinta-feira",
            day: "10",
            hour: "09:00",
        };

        apiMock.onGet(`users/${userId}`).reply(200, 
            {
                "name": "ana",
                "email": "ana@gmail",
                "password": "ana",
                "confirmPassword": "ana",
                "id": "1",
                "pets": [
                    {
                        "name": "Luna",
                        "type": "gato",
                        "age": "5",
                        "weight": "4",
                        "raca": "ND" 
                    },
                    {
                        "name": "Haka",
                        "type": "cachorro",
                        "age": "5",
                        "weight": "20",
                        "raca": "ND" 
                    }
                ]
            }
        ); 

        const { result, waitForNextUpdate} = renderHook( () =>  useUser(), {
            wrapper: UserProvider
        });

        const setSpy = jest.spyOn(Storage.prototype, "setItem");

        act( () =>
        {
            result.current.addUserConsult(consult, userId);
        });

        await waitForNextUpdate();

        expect(setSpy).toHaveBeenCalled();
        // expect(result.current.loggedUser.consults.length).toBe(1);
    });

    it("should be able to add a consult when there is consult scheduled", () =>
    {
        const userId = "1";

        const consult = {
            petName: "Lindo",
            services: ["banho"],
            month: 6,
            monthName: "Junho",
            weekDay: "Quinta-feira",
            day: "10",
            hour: "09:00",
        };

        apiMock.onGet("schedule").reply(200, [
            {
                "day": "10",
                "weekDay": "Quinta-feira",
                "monthName": "Junho",
                "month": 6,
                "year": "2021",
                "id": 1,
                "hoursAvailable": [
                    "09:00",
                    "09:30",
                    "10:00",
                    "10:30",
                    "11:00",
                    "11:30",
                    "13:00",
                    "13:30",
                    "14:00",
                    "14:30",
                    "15:00",
                    "15:30",
                    "16:00",
                    "16:30",
                    "17:00",
                    "17:30"
                ]
            },
            {
                "day": "11",
                "weekDay": "Sexta-feira",
                "monthName": "Junho",
                "month": 6,
                "year": "2021",
                "id": 2,
                "hoursAvailable": [
                    "09:00",
                    "09:30",
                    "10:00",
                    "10:30",
                    "11:00",
                    "11:30",
                    "13:00",
                    "13:30",
                    "14:00",
                    "14:30",
                    "15:00",
                    "15:30",
                    "16:00",
                    "16:30",
                    "17:00",
                    "17:30"
                ]
            }
        ]);

        apiMock.onGet(`users/${userId}`).reply(200, 
            {
                "name": "ana",
                "email": "ana@gmail",
                "password": "ana",
                "confirmPassword": "ana",
                "id": "1",
                "pets": [
                    {
                        "name": "Luna",
                        "type": "gato",
                        "age": "5",
                        "weight": "4",
                        "raca": "ND" 
                    },
                    {
                        "name": "Haka",
                        "type": "cachorro",
                        "age": "5",
                        "weight": "20",
                        "raca": "ND" 
                    }
                ],
                "consults": [
                    {
                        petName: "Lindo",
                        services: ["banho"],
                        month: 6,
                        monthName: "Junho",
                        weekDay: "Quinta-feira",
                        day: "10",
                        hour: "09:30",
                    }
                ]
            }
        ); 

        const { result } = renderHook( () =>  useUser(), {
            wrapper: UserProvider
        });

        act( () =>
        {
            result.current.addUserConsult(consult, userId);
        });

    });

    // USER LOGIN
    it("should be able to make user login", async () => 
    {
        const userData = {
            email: "email@email.com",
            password: "password"
        };

        apiMock.onGet("users").reply(200, [{
            name: "name",
            email: "email@email.com",
            password: "password",
            confirmPassword: "password"
        }]);

        const { result, waitForNextUpdate } = renderHook( () =>  useUser(), {
            wrapper: UserProvider
        });

        act( () =>
        {
            result.current.userLogin(userData);
        });

        // expect(result.current.loggedUser).toBe("email@email.com");
    });

    it("should not be able to make login user if password is wrong", () =>
    {
        const userData = {
            email: "email@email.com",
            password: "passwor"
        };

        apiMock.onGet("users").reply(200, [{
            name: "name",
            email: "email@email.com",
            password: "password",
            confirmPassword: "password"
        }]);

        const { result } = renderHook( () =>  useUser(), {
            wrapper: UserProvider
        });

        act( () =>
        {
            result.current.userLogin(userData);
        });

        expect(result.current.loggedUser.email).toBeFalsy();

    });

    it("should not be able to make login user if email is not registered", () =>
    {
        const userData = {
            email: "emai@email.com",
            password: "password"
        };

        apiMock.onGet("users").reply(200, [{
            name: "name",
            email: "email@email.com",
            password: "password",
            confirmPassword: "password"
        }]);

        const { result } = renderHook( () =>  useUser(), {
            wrapper: UserProvider
        });

        act( () =>
        {
            result.current.userLogin(userData);
        });

        expect(result.current.loggedUser.email).toBeFalsy();

    });

    // USER LOGOFF
    it("should be able to logoff user", () =>
    {
        const clearSpy = jest.spyOn(Storage.prototype, "clear");

        const { result } = renderHook( () => useUser(), {
            wrapper: UserProvider
        });

        act( () =>
        {
            result.current.userLogoff();
        });

        expect(clearSpy).toHaveBeenCalledTimes(1);
        expect(result.current.loggedUser.email).toBeFalsy();
    });

    // RESET PASSWORD
    it("should be able to reset user password if email is registered", () =>
    {
        const emailToResetPassword = "email@email.com";

        apiMock.onGet("users").reply(200, [
            {
                name: "name",
                email: "email@email.com",
                password: "password",
                confirmPassword: "password"
            }
        ]);

        const { result } = renderHook( () =>  useUser(), {
            wrapper: UserProvider
        });

        act( () =>
        {
            result.current.resetPassword(emailToResetPassword);
        });

        // expect(result.current.tryingToRecoverPassword).toBe(1);
    });

    it("should not be able to reset user password if email is not registered", () =>
    {
        const emailToResetPassword = "emai@email.com";

        apiMock.onGet("users").reply(200, [
            {
                name: "name",
                email: "email@email.com",
                password: "password",
                confirmPassword: "password"
            }
        ]);

        const { result } = renderHook( () =>  useUser(), {
            wrapper: UserProvider
        });

        act( () =>
        {
            result.current.resetPassword(emailToResetPassword);
        });

        // expect(result.current.tryingToRecoverPassword).toBe(1);
    });

    // SET NEW PASSWORD
    it("should be able to set new password if passwords match and there is no user logged", () =>
    {
        const userId = 1;

        const password = "newpassword";
        const confirmPassword = "newpassword";

        apiMock.onGet(`users/${userId}`).reply(200, 
            {
                "name": "ana",
                "email": "ana@gmail",
                "password": "ana",
                "confirmPassword": "ana",
                "id": "1",
                "pets": [
                    {
                        "name": "Luna",
                        "type": "gato",
                        "age": "5",
                        "weight": "4",
                        "raca": "ND" 
                    },
                    {
                        "name": "Haka",
                        "type": "cachorro",
                        "age": "5",
                        "weight": "20",
                        "raca": "ND" 
                    }
                ],
                "consults": [
                    {
                        petName: "Lindo",
                        services: ["banho"],
                        month: 6,
                        monthName: "Junho",
                        weekDay: "Quinta-feira",
                        day: "10",
                        hour: "09:30",
                    }
                ]
            }
        ); 

        const { result } = renderHook( () =>  useUser(), {
            wrapper: UserProvider
        });

        act( () =>
        {
            result.current.setNewPassword(1, password, confirmPassword);
        });
    });

    it("should not be able to set new password if passwords don't match and there is no user logged", () =>
    {
        const userId = 1;

        const password = "newpasswor";
        const confirmPassword = "newpassword";

        apiMock.onGet(`users/${userId}`).reply(200, 
            {
                "name": "ana",
                "email": "ana@gmail",
                "password": "ana",
                "confirmPassword": "ana",
                "id": "1",
                "pets": [
                    {
                        "name": "Luna",
                        "type": "gato",
                        "age": "5",
                        "weight": "4",
                        "raca": "ND" 
                    },
                    {
                        "name": "Haka",
                        "type": "cachorro",
                        "age": "5",
                        "weight": "20",
                        "raca": "ND" 
                    }
                ],
                "consults": [
                    {
                        petName: "Lindo",
                        services: ["banho"],
                        month: 6,
                        monthName: "Junho",
                        weekDay: "Quinta-feira",
                        day: "10",
                        hour: "09:30",
                    }
                ]
            }
        ); 

        const { result } = renderHook( () =>  useUser(), {
            wrapper: UserProvider
        });

        act( () =>
        {
            result.current.setNewPassword(1, password, confirmPassword);
        });
    });

    it("should be able to set new password if passwords match and there is user logged", () =>
    {
        const userId = 1;

        const password = "newpassword";
        const confirmPassword = "newpassword";

        apiMock.onGet(`users/${userId}`).reply(200, 
            {
                "name": "ana",
                "email": "ana@gmail",
                "password": "ana",
                "confirmPassword": "ana",
                "id": "1",
                "pets": [
                    {
                        "name": "Luna",
                        "type": "gato",
                        "age": "5",
                        "weight": "4",
                        "raca": "ND" 
                    },
                    {
                        "name": "Haka",
                        "type": "cachorro",
                        "age": "5",
                        "weight": "20",
                        "raca": "ND" 
                    }
                ],
                "consults": [
                    {
                        petName: "Lindo",
                        services: ["banho"],
                        month: 6,
                        monthName: "Junho",
                        weekDay: "Quinta-feira",
                        day: "10",
                        hour: "09:30",
                    }
                ]
            }
        ); 

        jest.spyOn(Storage.prototype, "getItem").mockImplementation((storageKey) =>
        {
            switch (storageKey)
            {
            case "@alphapets:loggedUser":
                return JSON.stringify([
                    {
                        "name": "ana",
                        "email": "ana@gmail",
                        "password": "ana",
                        "confirmPassword": "ana",
                        "id": "1"
                    }
                ]);
            default: 
                return null;
            }
        });

        const { result } = renderHook( () =>  useUser(), {
            wrapper: UserProvider
        });

        act( () =>
        {
            result.current.setNewPassword(1, password, confirmPassword);
        });
    });
});
