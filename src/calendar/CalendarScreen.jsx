import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Calendar,momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import Navbar from '../ui/Navbar';
import CalendarEvent from "./CalendarEvent";
import {messages} from '../helpers/calendar-message-es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CalendarModal from "./CalendarModal";
import {openModal} from "../actions/ui.actions";
import {clearActiveEvent, setActiveEvent, startEventLoading} from "../actions/events.actions";
import AddNewFab from "../ui/AddNewFab";
import DeleteEventFab from "../ui/DeleteEventFab";
moment.locale('es');
const localizer = momentLocalizer(moment);

const CalendarScreen = () => {
    const dispatch = useDispatch();
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
    const {events,activeEvent} = useSelector(state => state.calendar);
    const {uid} = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(startEventLoading());
    }, [dispatch]);


    const eventStyleGetter = (event)=>{
        const {user} = event;
        const {_id} = user;

        const style = {
            backgroundColor : uid === _id ? '#367CF7' : '#465660',
            borderRadius : '0px',
            color: 'white',
            display: 'block',
            opacity: 0.8,
        };
        return {style};
    };

    const handlerDoubleClick=()=>{
        dispatch(openModal());
    };

    const handlerSelectEvent=(event)=>{
        dispatch(setActiveEvent(event));
    };

    const handlerViewChange=(event)=>{
        setLastView(event);
        localStorage.setItem('lastView',event);
    };

    const handlerSelectedSlot=()=>{
        dispatch(clearActiveEvent());
    };

    return (
        <div className='calendar-screen'>
            <Navbar/>
            <Calendar
                components={{event : CalendarEvent}}
                endAccessor="end"
                events={events}
                eventPropGetter={eventStyleGetter}
                localizer={localizer}
                messages={messages}
                onDoubleClickEvent={handlerDoubleClick}
                onSelectEvent={handlerSelectEvent}
                onSelectSlot={handlerSelectedSlot}
                selectable={true}
                onView={handlerViewChange}
                startAccessor="start"
                view={lastView}
            />
            {activeEvent && <DeleteEventFab/>}
            <AddNewFab/>
            <CalendarModal/>
        </div>
    );
};

export default CalendarScreen;