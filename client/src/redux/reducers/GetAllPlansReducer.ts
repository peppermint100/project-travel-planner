import { GetAllPlansActionType, RECEIVE_GET_ALL_PLANS } from './../actions/GetAllPlansAction';
import { GetAllPlansResponseType } from './../../types/api/PlanType';

const initialState: GetAllPlansResponseType = {
    success: false,
    msg: "",
    plans: [],
    sharedPlans: []
}

const GetAllPlansReducer = (state = initialState, action: GetAllPlansActionType) => {
    switch(action.type){
        case RECEIVE_GET_ALL_PLANS:
            return action.getAllPlansResponse;
        default:
            return state;
    }
}

export default GetAllPlansReducer;