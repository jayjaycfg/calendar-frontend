import React from "react";
import {mount} from "enzyme";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {clearActiveEvent,startAddNewEvent,startEventUpdate} from "../actions/events.actions";
import CalendarModal from "./CalendarModal";
import moment from "moment";

jest.mock("../actions/events.actions",()=>({
    clearActiveEvent : jest.fn(),
    startEventUpdate : jest.fn(),
    startAddNewEvent : jest.fn(),
}));


const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const startDateEvent = moment().minutes(0).seconds(0).add(1,'hours');
const endDateEvent = startDateEvent.clone().add(1,'hours');

const initialState = {
    auth :{
        uid: '123',
        name: 'test'
    },
    calendar: {
        events : [],
        activeEvent: {
            end: endDateEvent.toDate(),
            notes: 'test',
            start: startDateEvent.toDate(),
            title : 'Cumple'
        }
    },
    ui : {
        modalOpen : true
    }
};
let store = mockStore(initialState);

store.dispatch = jest.fn();
// Storage.prototype.setItem = jest.fn();

let wrapper = mount(
    <Provider store={store}>
        <CalendarModal/>
    </Provider>
);

describe('<CalendarModal/>', () => {
    beforeEach(()=>{
        jest.clearAllMocks();
    });

    test('should be defined', () => {
        const modal = wrapper.find('Modal');
        expect(modal.prop('isOpen')).toBeTruthy();
    });

    test('should update event and close modal', () => {
        const eventForm = wrapper.find('form');
        eventForm.simulate('submit',{preventDefault(){}});
        expect(startEventUpdate).toHaveBeenCalledWith(initialState.calendar.activeEvent);
        expect(clearActiveEvent).toHaveBeenCalled();
    });

    test('should create a new event', () => {
        const initialState = {
            auth :{
                uid: '123',
                name: 'test'
            },
            calendar: {
                events : [],
                activeEvent: null
            },
            ui : {
                modalOpen : true
            }
        };
        let store = mockStore(initialState);
        store.dispatch = jest.fn();

        let wrapper = mount(
            <Provider store={store}>
                <CalendarModal/>
            </Provider>
        );
        const eventForm = wrapper.find('form');

        const inputTitle = wrapper.find('input[name="title"]');
        inputTitle.simulate('change',{target : {name : 'title', value : 'Cumple'}});

        const inputNotes = wrapper.find('textarea[name="notes"]');
        inputNotes.simulate('change',{target : {name : 'notes', value : 'party all day long'}});

        eventForm.simulate('submit',{preventDefault(){}});
        expect(startAddNewEvent).toHaveBeenCalledWith({
            end : expect.any(Date),
            title:'Cumple',
            notes:'party all day long',
            start : expect.any(Date)
        });
    });

});