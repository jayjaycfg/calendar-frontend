import moment from 'moment';

const prepareEvent =(events)=>{
    return events.map(event=>({
        ...event,
        end: moment(event.end).toDate(),
        start: moment(event.start).toDate()
    }));
};

export default prepareEvent;