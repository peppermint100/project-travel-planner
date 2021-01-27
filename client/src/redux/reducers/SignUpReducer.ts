import { SignUpResponse } from "../../types/api/UserType";
import { RECEIVE_SIGN_UP, SignUpActionType } from "../actions/SignUpAction";

const initialState: SignUpResponse = {
    isLoading: true,
    success: false,
    msg: ""
}

const SignUpReducer = (state = initialState, action: SignUpActionType) => {
    switch(action.type){
        case RECEIVE_SIGN_UP:
            const { success, msg } = action.response
            return {
                isLoading: false,
                success,
                msg
            };
        default:
            return state;
    }
}

export default SignUpReducer;