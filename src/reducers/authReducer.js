import {types} from '../types/types';
const initialState = {
    checking : true,
};

const authReducer = (state = initialState, {type,payload}) => {
    switch (type) {

        case types.authCheckingFinish :
            return {
                ...state,
                checking: true
            };
        case types.authStartLogin :
            return {

            };
        case types.authLogin :
            return {
                ...state,
                ...payload,
                checking: false
            };
        case types.authStartRegister :
            return {
                ...state,
                ...payload,
                checking: false
            };
        case types.authStartTokenRenew :
            return {

            };
        case types.authLogout :
            return {
                state: initialState
            };
        default :
            return state
    }
};

export default authReducer;