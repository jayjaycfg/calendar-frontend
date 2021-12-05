import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {startChecking, startLogin, startRegister} from "./auth.actions";
import * as fetchModule from "../helpers/fetch";

import {types} from "../types/types";
import Swal from "sweetalert2";


jest.mock('sweetalert2',()=>({
    fire : jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};
let store = mockStore(initialState);

Storage.prototype.setItem = jest.fn();

describe('Auth actions', () => {

    beforeEach(()=>{
        store = mockStore(initialState);
        jest.clearAllMocks();
    });

    test('startLogin success', async() => {
        await store.dispatch(startLogin('mail@mail.com','123456'));
        const actionsDispatched = store.getActions();
        const received = {
            type: types.authLogin,
                payload: {
                    uid: expect.any(String),
                    name: expect.any(String)
            }
        };
        expect(actionsDispatched[0]).toEqual(received);
        expect(localStorage.setItem).toHaveBeenCalledWith('token',expect.any(String));
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date',expect.any(Number));
    });

    test('should startLogin error',  async() => {
        //password incorrecto
        await store.dispatch(startLogin('mail@mail.com','12345678'));
        let actionsDispatched = store.getActions();
        expect(actionsDispatched).toEqual([]);
        expect(Swal.fire).toHaveBeenCalledWith('Error','password no coincide');
        //email incorrecto
        await store.dispatch(startLogin('badmail@mail.com','123456'));
        expect(Swal.fire).toHaveBeenCalledWith('Error',{});
    });

    test('should startRegister success', async () => {
        fetchModule.fetchToken = jest.fn(()=>({
            json(){
                return{
                    name: 'test',
                    ok : true,
                    token: 'ABCtest',
                    uid: '123',
                }
            }
        }));
        await store.dispatch(startRegister('mail4@mail.com','Juan','123456'));
        const actionsDispatched = store.getActions();
        expect(actionsDispatched[0]).toEqual({
            type: types.authStartRegister,
            payload: {
                nameU: 'test',
                uid: '123'
            }
        });
        expect(localStorage.setItem).toHaveBeenCalledWith('token','ABCtest');
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date',expect.any(Number));
    });

    test('should startChecking success', async () => {
        fetchModule.fetchWithToken = jest.fn(()=>({
            json(){
                return{
                    name: 'test',
                    ok: true,
                    token: 'ABC1212',
                    uid: '1212'
                }
            }
        }));

        await store.dispatch(startChecking());
        const actionsDispatched = store.getActions();
        expect(actionsDispatched[0]).toEqual({
            type : types.authLogin,
            payload: {
                name : 'test',
                uid: '1212'
            }
        });
        expect(localStorage.setItem).toHaveBeenCalledWith('token','ABC1212');
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date',expect.any(Number));
    });
});