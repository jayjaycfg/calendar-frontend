import {types} from '../types/types';

const initialState = {
    events:[],
    activeEvent: null
};

const calendarReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case types.eventAddNew:
            return{
                ...state,
                events: [...state.events,payload]
            };
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: payload
            };
        case types.eventClearActive:
            return {
                ...state,
                activeEvent: null
            };
        case types.eventUpdate:
            return {
                ...state,
              events: state.events.map(event=>event.id === payload.id
                  ? payload
                  : event
              )
            };
        case types.eventDelete:
            return {
                ...state,
                events: state.events.filter(event=>event.id !== state.activeEvent.id),
                activeEvent: null
            };
        case types.eventLoaded:
            return {
                ...state,
                events: [...payload]
            };
        default : return state;
    }
};

export default calendarReducer;