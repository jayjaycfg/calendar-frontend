import React, {useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import DateTimePicker from 'react-datetime-picker';
import Modal from 'react-modal';
import moment from "moment";
import Swal from "sweetalert2";
import {closeModal} from "../actions/ui.actions";
import {clearActiveEvent, startAddNewEvent, startEventUpdate} from "../actions/events.actions";
import {SWAL_TEXT,FIELD_TEXT,UI_TEXT} from '../helpers/text';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
process.env.NODE_ENV !=='test'  && Modal.setAppElement('#root');

const startDateEvent = moment().minutes(0).seconds(0).add(1,'hours');
const endDateEvent = startDateEvent.clone().add(1,'hours');
const initEvent = {
    end: endDateEvent.toDate(),
    notes: '',
    start: startDateEvent.toDate(),
    title:'',
};

const CalendarModal = () => {
    const dispatch = useDispatch();
    const {modalOpen} = useSelector(state => state.ui);
    const {activeEvent} = useSelector(state => state.calendar);

    const [startDate, setStartDate] = useState(startDateEvent.toDate());
    const [endDate, setEndDate] = useState(endDateEvent.toDate());
    const [formValues,handlerOnChange] = useState(initEvent);

    useEffect(() => {
        if(activeEvent){
            handlerOnChange(activeEvent);
        }else{
            handlerOnChange(initEvent);
        }
    }, [activeEvent,handlerOnChange]);


    const [titleValid, setTitleValid] = useState(true);

    const {end,notes,start,title} = formValues;

    const handlerInputOnChange = ({target})=>{
        const {name,value} = target;
        handlerOnChange(prevState => ({...prevState,[name]: value}));
    };

    const handlerOnClose = ()=>{
        dispatch(closeModal());
        dispatch(clearActiveEvent());
        handlerOnChange(initEvent);
    };

    const handlerStartDateChange=(event)=>{
        setStartDate(event);
        handlerOnChange(prevState => ({...prevState,start: event}));

    };

    const handlerEndDateChange=(event)=>{
        setEndDate(event);
        handlerOnChange(prevState => ({...prevState,end: event}));

    };

    const handlerFormSubmit=(event)=>{
        event.preventDefault();
        const momentStart  = moment(start);
        const momentEnd  = moment(end);

        if(momentStart.isSameOrAfter(momentEnd)){
            return Swal.fire(SWAL_TEXT.ERROR_TITLE,SWAL_TEXT.ERROR_DATE_RANGE,SWAL_TEXT.ERROR_ICON);
        }

        if(title.trim().length <2){
            setTitleValid(false);
        }
        if(activeEvent){
            dispatch(startEventUpdate(formValues));
        }else {
            dispatch(startAddNewEvent(formValues));
        }
        setTitleValid(true);
        handlerOnClose();
    };

    return (
        <Modal
            className='modal'
            isOpen={modalOpen}
            onRequestClose={handlerOnClose}
            overlayClassName='modal-fondo'
            style={customStyles}
            ariaHideApp={process.env.NODE_ENV === 'test'}
        >
            <h1> {activeEvent ? UI_TEXT.EDIT_EVENT_TITLE : UI_TEXT.NEW_EVENT_TITLE } </h1>
            <hr />
            <form className="container" onSubmit={handlerFormSubmit}>

                <div className="form-group">
                    <label>{FIELD_TEXT.LBL_START_DATE}</label>
                    <DateTimePicker
                        className='form-control'
                        onChange={handlerStartDateChange}
                        value={startDate}
                    />
                </div>

                <div className="form-group">
                    <label>{FIELD_TEXT.LBL_END_DATE}</label>
                    <DateTimePicker
                        className='form-control'
                        onChange={handlerEndDateChange}
                        minDate={startDate}
                        value={endDate}
                    />
                </div>
                <hr />
                <div className="form-group">
                    <label>{FIELD_TEXT.EVENT_TITLE_NOTES}</label>
                    <input
                        autoComplete="off"
                        className={`form-control ${!titleValid && 'is-invalid'}`}
                        name={FIELD_TEXT.EVENT_TITLE}
                        onChange={handlerInputOnChange}
                        placeholder={FIELD_TEXT.EVENT_TITLE_PLHDER}
                        type={FIELD_TEXT.TEXT_TYPE}
                        value={title}
                    />
                    <small id="emailHelp" className="form-text text-muted">{FIELD_TEXT.EVENT_TITLE_DESCTP}</small>
                </div>

                <div className="form-group">
        <textarea
            className="form-control"
            name={FIELD_TEXT.EVENT_NOTES}
            onChange={handlerInputOnChange}
            placeholder={FIELD_TEXT.EVENT_NOTES_PLHDER}
            rows="5"
            value={notes}
        />
                    <small id="emailHelp" className="form-text text-muted">{FIELD_TEXT.EVENT_NOTES_DESCTP}</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"/>
                    <span>{FIELD_TEXT.BTN_SAVE}</span>
                </button>

            </form>
        </Modal>
    );
};

export default CalendarModal;