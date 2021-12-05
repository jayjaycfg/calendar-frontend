import Swal from "sweetalert2";
import {types} from '../types/types';
import {fetchToken, fetchWithToken} from "../helpers/fetch";
import {SWAL_TEXT} from "../helpers/text";

const login =(user)=>({
    type : types.authLogin,
    payload : user
});

export const startLogin =(email,password)=>{
    return async (dispatch)=>{
        const response = await fetchToken('auth',{email,password},'POST');
        const {msg,name,ok,token,uid} = await response.json();
        if(ok){
            localStorage.setItem('token', token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login({
                uid,
                name
            }));
        }else{
            await Swal.fire(SWAL_TEXT.ERROR_TITLE, msg);
        }
    };
};

const register = (user)=>({
    type: types.authStartRegister,
    payload : user
});

export const startRegister=(email,name,password)=>{
    return async (dispatch)=>{
        const response = await fetchToken('auth/new',{email,name,password},'POST');
        const {msg,name : nameU,ok,token,uid} = await response.json();
        if(ok){
            localStorage.setItem('token',token);
            localStorage.setItem('token-init-date',new Date().getTime());
            dispatch(register({
                uid,
                nameU
            }));
        }else{
            await Swal.fire(SWAL_TEXT.ERROR_TITLE,msg);
        }

    };
};

const checking = ()=>({
    type : types.authCheckingFinish
});

export const startChecking=()=>{
    return async (dispatch)=>{
        const response = await fetchWithToken('auth/renew');
        const {name,ok,token,uid} = await response.json();

        if(ok){
            localStorage.setItem('token',token);
            localStorage.setItem('token-init-date',new Date().getTime());
            dispatch(login({
                uid,
                name
            }));
        }else{
            dispatch(checking());
        }
    };
};

const logout =()=>({type : types.authLogout});

export const startLogout =()=>{
    return (dispatch)=>{
        localStorage.clear();
        dispatch(logout());
    };
};