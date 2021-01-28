import { BasicResponse } from "../../types/api/BasicApiType";
import { LoginResponse, MeResponse, SignUpResponse } from "../../types/api/UserType";
import { LoginActionType, RECEIVE_LOG_IN } from "../actions/LoginAction";
import { MeActionType, RECEIVE_ME } from "../actions/MeAction";

const initialState: MeResponse = {
    success: false,
    msg: "",
    email: "",
    name: "",
    userId: 0
}

const MeReducer = (state = initialState, action: MeActionType) => {
    switch(action.type){
        case RECEIVE_ME:
            const { success, msg, email, name, userId } = action.response
            return {
                success,
                msg,
                email,
                name,
                userId
            };
        default:
            return state;
    }
}

export default MeReducer;