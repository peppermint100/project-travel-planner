import { MeResponse} from "../../types/api/UserType";
import { MeActionType, RECEIVE_ME } from "../actions/MeAction";

const initialState: MeResponse = {
    success: false,
    msg: "",
    email: "",
    name: "",
    userId: 0,
    userImage: ""
}

const MeReducer = (state = initialState, action: MeActionType) => {
    switch(action.type){
        case RECEIVE_ME:
            const { success, msg, email, name, userId, userImage } = action.response
            return {
                success,
                msg,
                email,
                name,
                userId,
                userImage
            };
        default:
            return state;
    }
}

export default MeReducer;