import React from "react";
import {mount} from "enzyme";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {messages} from "../helpers/calendar-message-es";
import {clearActiveEvent, setActiveEvent, startEventLoading} from "../actions/events.actions";
import CalendarScreen from "./CalendarScreen";
import {act} from "@testing-library/react";

jest.mock("../actions/events.actions",()=>({
    setActiveEvent : jest.fn(),
    startEventLoading : jest.fn(),
    clearActiveEvent : jest.fn()
}));


const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
    auth :{
        uid: '123',
        name: 'test'
    },
    calendar: {
        events : []
    },
    ui : {
        modalOpen : false
    }
};
let store = mockStore(initialState);
store.dispatch = jest.fn();
Storage.prototype.setItem = jest.fn();
let wrapper = mount(
    <Provider store={store}>
        <CalendarScreen/>
    </Provider>
);

describe('<CalendarScreen/>', () => {
    test('should ', () => {
        expect(wrapper).toBeDefined();
    });

    test('should call Calendar functions', () => {
        const calendar = wrapper.find('Calendar');

        const calendarMSG = calendar.prop('messages');
        expect(calendarMSG).toEqual(messages);

        calendar.prop('onDoubleClickEvent')();
        expect(store.dispatch).toHaveBeenCalledWith({"type": "[UI] Open Modal"});


        calendar.prop('onSelectEvent')({start: 'Hola'});
        expect(setActiveEvent).toHaveBeenCalledWith({start: 'Hola'});

        act(()=>{
            calendar.prop('onView')('week');
            expect(localStorage.setItem).toHaveBeenCalledWith('lastView', 'week');
        });
    });
});