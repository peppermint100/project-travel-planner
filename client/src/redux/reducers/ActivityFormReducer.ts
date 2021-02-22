import { SET_ACTIVITY_NAME, SET_ACTIVITY_TIME, IActivityFormAction } from './../actions/ActivityFormAction';
import { ActivitiyFormType } from "../../types/detail/FormType";

const initialState: ActivitiyFormType = {
    activityName: "",
    time: "00:00:00"
}

const ActivityFormReducer = (state = initialState, action: IActivityFormAction) => {
    switch(action.type){
        case SET_ACTIVITY_NAME:
            return {
                ...state,
                activityName: action.activityName
            }
        case SET_ACTIVITY_TIME:
            return {
                ...state,
                time: action.time
            }
        default:
            return state;
    }
}

export default ActivityFormReducer;