import { LoginResponse, SignUpResponse } from "../../types/api/UserType";
import { LoginActionType, RECEIVE_LOG_IN } from "../actions/LoginAction";

const initialState: LoginResponse = {
    success: false,
    msg: "",
    token: ""
}

const LoginReducer = (state = initialState, action: LoginActionType) => {
    switch(action.type){
        case RECEIVE_LOG_IN:
            const { success, msg, token } = action.response
            return {
                success,
                msg,
                token
            };
        default:
            return state;
    }
}

export default LoginReducer;