import React from "react";
import {mount} from "enzyme";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Swal from "sweetalert2";
import LoginScreen from "./LoginScreen";
import {startLogin,startRegister} from "../actions/auth.actions";


const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};
let store = mockStore(initialState);

jest.mock("../actions/auth.actions",()=>({
    startLogin : jest.fn(),
    startRegister : jest.fn()
}));


jest.mock("sweetalert2",()=>({
    fire : jest.fn()
}));


store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <LoginScreen/>
    </Provider>
);

describe('<LoginScreen/>', () => {

    beforeEach(()=>{
        jest.clearAllMocks();
    });

    test('should ', () => {
        expect(wrapper).toBeDefined();
    });

    test('should call login dispatch', () => {
        const inputEmail = wrapper.find('input[name="login_email"]');
        const inputPassword = wrapper.find('input[name="login_password"]');

        inputEmail.simulate('change',{
            target : {
                name : 'login_email',
                value : 'mailtest@mail.com'
            }
        });
        inputPassword.simulate('change',{
            target : {
                name : 'login_password',
                value : '123456'
            }
        });


        const formLogin = wrapper.find('form').at(0);
        formLogin.simulate('submit',{preventDefault(){}});
        expect(startLogin).toHaveBeenCalledWith('mailtest@mail.com','123456');

    });

    test('should call register dispatch', () => {
        const inputEmail = wrapper.find('input[name="register_email"]');
        const inputName = wrapper.find('input[name="register_name"]');
        const inputPassword = wrapper.find('input[name="register_papssword"]');

        inputEmail.simulate('change',{
            target : {
                name : 'register_email',
                value : 'mailtest@mail.com'
            }
        });
        inputPassword.simulate('change',{
            target : {
                name : 'register_password',
                value : '123456'
            }
        });
        inputName.simulate('change',{
            target : {
                name : 'register_name',
                value : 'Test'
            }
        });

        const formRegister = wrapper.find('form').at(1);
        formRegister.simulate('submit',{preventDefault(){}});
        expect(startRegister).toHaveBeenCalledWith('mailtest@mail.com','Test','123456');
    });

    test('should not call register dispatch', () => {
        const inputPassword = wrapper.find('input[name="register_papssword"]');

        inputPassword.simulate('change',{
            target : {
                name : 'register_password',
                value : '123456789'
            }
        });

        const formRegister = wrapper.find('form').at(1);
        formRegister.simulate('submit',{preventDefault(){}});
        expect(startRegister).not.toHaveBeenCalled();
        expect(Swal.fire).toHaveBeenCalledWith('Error','los passwords no coinciden');
    });
});