import Swal from 'sweetalert2';
import {types} from '../types/types';
import {fetchWithToken} from "../helpers/fetch";
import prepareEvent from "../helpers/prepareEvents";
import {SWAL_TEXT} from "../helpers/text";


const addNewEvent=(event)=>({type: types.eventAddNew, payload: event});

export const startAddNewEvent =(event)=>{
    return async (dispatch, getState)=>{
        const {uid, name} = getState().auth;
        try{
            const response = await fetchWithToken('events',event,'POST');
            const {ok,eventoGuardado} = await response.json();

            if(ok){
                event.id = eventoGuardado.id;
                event.user = {
                    _id : uid,
                    name
                };

                dispatch(addNewEvent(event));
            }else{
                return Swal.fire(SWAL_TEXT.ERROR_TITLE,SWAL_TEXT.ERROR_MESSAGE,SWAL_TEXT.ERROR_ICON);
            }
        }catch (e) {
          return Swal.fire(SWAL_TEXT.ERROR_TITLE,e,SWAL_TEXT.ERROR_ICON);
        }
    };
};

export const setActiveEvent=(event)=>({type: types.eventSetActive, payload: event});
export const clearActiveEvent=()=>({type: types.eventClearActive});

const updateEvent=(event)=>({type: types.eventUpdate, payload: event});

export const startEventUpdate = (event)=>{

    return async (dispatch)=>{
        try{
            const response = await fetchWithToken(`events/${event.id}`,event,'PUT');
            const {msg,ok} = await response.json();
            if(ok){
                dispatch(updateEvent(event));
            }else{
                return Swal.fire(SWAL_TEXT.ERROR_TITLE,msg,SWAL_TEXT.ERROR_ICON);
            }
        }catch (e) {
            return Swal.fire(SWAL_TEXT.ERROR_TITLE,e,SWAL_TEXT.ERROR_ICON);
        }
    };
};

const deleteEvent=()=>({type: types.eventDelete});

export const startEventDelete =()=>{
    return async (dispatch,getState)=>{
        const {id} = getState().calendar.activeEvent;
        try{
            const response = await fetchWithToken(`events/${id}`,undefined,'DELETE');
            const {msg,ok} = await response.json();
            if(ok){
               dispatch(deleteEvent());
            }else{
                return Swal.fire(SWAL_TEXT.ERROR_TITLE,msg,SWAL_TEXT.ERROR_ICON);
            }
        }catch (e) {
            return Swal.fire(SWAL_TEXT.ERROR_TITLE,e,SWAL_TEXT.ERROR_ICON);
        }
    };
};

const eventLoaded =(events)=>({type: types.eventLoaded, payload : events});

export const startEventLoading =()=>{
    return async (dispatch)=>{
        try{
            const response = await fetchWithToken('events');
            const {ok, eventsBD} = await response.json();

            if(ok){
                const events = prepareEvent(eventsBD);
                dispatch(eventLoaded(events));
            }else{
                return Swal.fire(SWAL_TEXT.ERROR_TITLE,SWAL_TEXT.ERROR_MESSAGE,SWAL_TEXT.ERROR_ICON);
            }

        }catch (e) {
            return  Swal.fire(SWAL_TEXT.ERROR_TITLE,e,SWAL_TEXT.ERROR_ICON);
        }
    };
};