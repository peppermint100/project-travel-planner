import { combineReducers } from "redux";
import CheckConeectionReducer from "./CheckConnectionReducer";
import SignUpReducer from "./SignUpReducer";
import LoginReducer from "./LoginReducer";
import MeReducer from "./MeReducer"
import ResetPasswordReducer from "./ResetPasswordReducer"
import GetAllPlansReducer from "./GetAllPlansReducer"

export const rootReducer = combineReducers({
    CheckConeectionReducer,
    SignUpReducer,
    LoginReducer,
    MeReducer,
    ResetPasswordReducer,
    GetAllPlansReducer
})
export type RootReducerType = ReturnType<typeof rootReducer>