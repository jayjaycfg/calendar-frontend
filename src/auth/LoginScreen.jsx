import React from 'react';
import {useDispatch} from 'react-redux';
import Swal from "sweetalert2";
import {useForm} from "../hooks/useForm";
import {startLogin, startRegister} from "../actions/auth.actions";
import {SWAL_TEXT,FIELD_TEXT} from "../helpers/text";

import './login.css';

const LoginScreen = () => {
    const [formLoginValues,onInputChange] = useForm({
        login_email : 'mail@mail.com',
        login_password : '123456',
    });
    const [formRegisterValues,onRegisterInputChange] = useForm({
        register_email : 'mail3@mail.com',
        register_name : 'Juan3',
        register_password : '123456',
        register_password_two : '123456',
    });

    const dispatch  = useDispatch();

    const {login_email,login_password} = formLoginValues;
    const {register_email,register_name,register_password,register_password_two} = formRegisterValues;

    const handlerFormSubmit = (event)=>{
        event.preventDefault();
        dispatch(startLogin(login_email,login_password));
    };

    const handlerFormRegisterSubmit = (event)=>{
        event.preventDefault();
        if(register_password !== register_password_two){
            return Swal.fire(SWAL_TEXT.ERROR_TITLE, SWAL_TEXT.ERROR_PASSWORD);
        }
        dispatch(startRegister(register_email,register_name,register_password));
    };

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handlerFormSubmit}>
                        <div className="form-group">
                            <input
                                className="form-control"
                                name={FIELD_TEXT.LOGIN_EMAIL}
                                onChange={onInputChange}
                                placeholder={FIELD_TEXT.EMAIL_PLHDER}
                                type={FIELD_TEXT.TEXT_TYPE}
                                value={login_email}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                name={FIELD_TEXT.LOGIN_PASSWORD}
                                onChange={onInputChange}
                                placeholder={FIELD_TEXT.PASSWORD_PLHDER}
                                type={FIELD_TEXT.PASSWORD_TYPE}
                                value={login_password}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                className="btnSubmit"
                                type={FIELD_TEXT.SUBMIT_TYPE}
                                value={FIELD_TEXT.BTN_LOGIN}
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handlerFormRegisterSubmit}>
                        <div className="form-group">
                            <input
                                className="form-control"
                                name={FIELD_TEXT.REGISTER_NAME}
                                onChange={onRegisterInputChange}
                                placeholder={FIELD_TEXT.NAME_PLHDER}
                                type={FIELD_TEXT.TEXT_TYPE}
                                value={register_name}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                name=
                                onChange={onRegisterInputChange}
                                placeholder={FIELD_TEXT.EMAIL_PLHDER}
                                type={FIELD_TEXT.EMAIL_TYPE}
                                value={register_email}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                name={FIELD_TEXT.REGISTER_PASSWORD}
                                onChange={onRegisterInputChange}
                                placeholder={FIELD_TEXT.PASSWORD_PLHDER}
                                type={FIELD_TEXT.PASSWORD_TYPE}
                                value={register_password}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                className="form-control"
                                name={FIELD_TEXT.REPEAT_REGISTER_PASSWORD}
                                onChange={onRegisterInputChange}
                                placeholder={FIELD_TEXT.REPEAT_PASSWD_PLHDER}
                                type={FIELD_TEXT.PASSWORD_TYPE}
                                value={register_password_two}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                className="btnSubmit"
                                type={FIELD_TEXT.SUBMIT_TYPE}
                                value={FIELD_TEXT.BTN_REGISTER}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default LoginScreen;