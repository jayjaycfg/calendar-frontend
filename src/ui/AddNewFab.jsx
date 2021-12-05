import React from 'react';
import {useDispatch} from 'react-redux';
import {openModal} from "../actions/ui.actions";

const AddNewFab = () => {
    const dispatch = useDispatch();
    return (
        <button
            className='btn btn-primary fab'
            onClick={()=>dispatch(openModal())}
        >
            <i className='fas fa-plus'/>
        </button>
    );
};

export default AddNewFab;