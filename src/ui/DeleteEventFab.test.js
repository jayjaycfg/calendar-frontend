import React from "react";
import {mount} from "enzyme";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import DeleteEventFab from "./DeleteEventFab";
import {startEventDelete} from "../actions/events.actions";

jest.mock("../actions/events.actions",()=>({
    startEventDelete : jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};
let store = mockStore(initialState);
store.dispatch = jest.fn();

let wrapper = mount(
    <Provider store={store}>
        <DeleteEventFab/>
    </Provider>
);
describe('<DeleteEventFab/> Component', () => {
    test('should ', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('should delete an event', async() => {
        const btn = wrapper.find('button');
        btn.simulate('click');
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(startEventDelete).toHaveBeenCalledTimes(1);
    });
});