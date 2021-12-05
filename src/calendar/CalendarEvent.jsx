import React from 'react';

const CalendarEvent = ({event}) => {
    const {title, user} = event;
    const {name} = user;
    return (
        <div>
            <strong>{title}</strong>
            <span> - {name}</span>
        </div>
    );
};

export default CalendarEvent;