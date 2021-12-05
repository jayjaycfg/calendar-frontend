import React from 'react';
import {useDispatch} from 'react-redux';
import {startEventDelete} from "../actions/events.actions";
import {FIELD_TEXT} from "../helpers/text";

const DeleteEventFab = () => {
    const dispatch = useDispatch();
    return (
        <button
            className='btn btn-danger fab-danger'
            onClick={()=>dispatch(startEventDelete())}
        >
            <i className='fas fa-trash'/>
            <span>{FIELD_TEXT.BTN_DELETE}</span>
        </button>
    );
};

export default DeleteEventFab;