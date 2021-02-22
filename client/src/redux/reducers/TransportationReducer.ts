import { ITransportationAction, SET_TRANSPORTATION_TYPE, SET_TRANSPORTATION_TIME_START, SET_TRANSPORTATION_TIME_ARRIVE } from './../actions/TransportationAction';
import { TransportationType } from "../../types/api/DetailType";
import { TransportationFormType } from './../../types/detail/FormType';

const initialState: TransportationFormType = {
    timeArrive: "00:00:00",
    timeStart: "00:00:00",
    transportationType: TransportationType.WALK
}

const ActivityFormReducer = (state = initialState, action: ITransportationAction) => {
    switch(action.type){
        case SET_TRANSPORTATION_TYPE:
            return {
                ...state,
                transportationType: action.transportationType
            }

        case SET_TRANSPORTATION_TIME_START:
            return {
                ...state,
                timeStart: action.timeStart
            }

        case SET_TRANSPORTATION_TIME_ARRIVE:
            return {
                ...state,
                timeArrive: action.timeArrive
            }

        default:
            return state;
    }
}

export default ActivityFormReducer;