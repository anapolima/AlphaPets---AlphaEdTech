import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Account from "../pages/Account/Account";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import Home from "../pages/Home/Home";
import Initial from "../pages/Initial/Initial";
import LoginPage from "../pages/Login/LoginPage";
import MyPets from "../pages/MyPets/MyPets";
import PetRegister from "../pages/PetRegister/PetRegister";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import SchedulePage from "../pages/ScheduleConsult/ScheduleConsult";
import UserRegister from "../pages/UserRegister/UserRegister";

function Routes () 
{
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Initial} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/register" component={UserRegister} />
                <Route exact path="/register-pet" component={PetRegister} />
                <Route exact path="/schedule-consult" component={SchedulePage} />
                <Route exact path="/my-pets" component={MyPets} />
                <Route exact path="/forgot-password" component={ForgotPassword} />
                <Route exact path="/reset-password" component={ResetPassword} />
                <Route exact path="/account" component={Account} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
