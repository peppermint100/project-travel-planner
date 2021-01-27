import { BasicResponse } from "../../types/api/BasicApiType";
import { MeResponse} from "../../types/api/UserType";
import { MeActionType, RECEIVE_ME } from "../actions/MeAction";
import { RECEIVE_RESET_PASSWORD, ResetPasswordActionType } from "../actions/ResetPasswordAction";

const initialState: BasicResponse = {
    success: false,
    msg: "",
}

const ResetPasswordReducer = (state = initialState, action: ResetPasswordActionType) => {
    switch(action.type){
        case RECEIVE_RESET_PASSWORD:
            const { success, msg } = action.response
            return {
                success,
                msg,
            };
        default:
            return state;
    }
}

export default ResetPasswordReducer;