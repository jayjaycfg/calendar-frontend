import React from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {startLogout} from "../actions/auth.actions";
import {FIELD_TEXT} from "../helpers/text";

const Navbar = () => {
    const dispatch = useDispatch();
    const {name} = useSelector(state => state.auth);
    const handlerLogout =()=>{
        dispatch(startLogout());
    };

    return (
        <div className=' navbar navbar-dark bg-dark mb-4'>
            <span className='navbar-brand'>
                {name}
            </span>
            <button className="btn btn-danger" onClick={handlerLogout}>
                <i className="fas fa-sign-out-alt"></i>
                <span>{FIELD_TEXT.BTN_LOGOUT}</span>
            </button>
        </div>
    );
};

export default Navbar;