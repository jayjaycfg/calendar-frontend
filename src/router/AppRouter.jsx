import React, {useEffect} from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Switch
}
from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import CalendarScreen from '../calendar/CalendarScreen';
import LoginScreen from '../auth/LoginScreen';
import {startChecking} from "../actions/auth.actions";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";


const AppRouter = () => {
    const dispatch= useDispatch();
    const {uid} = useSelector(state => state.auth);

    useEffect(()=>{
        dispatch(startChecking());
    },[dispatch]);

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute exact path='/login' component ={LoginScreen} isAuthenticated={!!uid}/>
                    <PrivateRoute exact path='/'  component ={CalendarScreen} isAuthenticated={!!uid}/>
                    <Redirect to='/'/>
                </Switch>
            </div>
        </Router>
    );
};

export default AppRouter;