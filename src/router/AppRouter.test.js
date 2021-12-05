import React from "react";
import {mount} from "enzyme";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import AppRouter from "./AppRouter";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// jest.mock("../actions/events.actions",()=>({
//     startEventDelete : jest.fn()
// }));

// store.dispatch = jest.fn();


describe('<AppRouter/>', () => {
    test('should render public router', () => {
        const initialState = {
            auth : {
                checking: false,
                uid: null
            }
        };
        let store = mockStore(initialState);

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter/>
            </Provider>
        );
        expect(wrapper.find('.login-container').exists()).toBeTruthy();
    });

    test('should render private router', () => {
        const initialState = {
            auth : {
                checking: false,
                name: 'Test',
                uid: '1233'
            },
            calendar:{
                events : []
            },
            ui : {
                modalOpen: false
            }

        };
        let store = mockStore(initialState);

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter/>
            </Provider>
        );
        expect(wrapper.find('.calendar-screen').exists()).toBeTruthy();
    });
});