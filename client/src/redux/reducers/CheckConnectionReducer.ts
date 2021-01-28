import { CheckConnectionType } from "../../types/api/CheckConectionType";
import { CheckConnectionActionType, RECEIVE_CHECK_CONNECTION } from "../actions/CheckConnectionAction";

const initialState: CheckConnectionType = {
    isLoading: true,
    success: false
}

const CheckConnectionReducer = (state = initialState, action: CheckConnectionActionType) => {
    switch(action.type){
        case RECEIVE_CHECK_CONNECTION:
            return action.checkConnectionResult;
        default:
            return initialState;
    }
}

export default CheckConnectionReducer;