import { combineReducers } from "redux";
import CheckConeectionReducer from "./CheckConnectionReducer";
import SignUpReducer from "./SignUpReducer";
import LoginReducer from "./LoginReducer";
import MeReducer from "./MeReducer"
import ResetPasswordReducer from "./ResetPasswordReducer"

export const rootReducer = combineReducers({
    CheckConeectionReducer,
    SignUpReducer,
    LoginReducer,
    MeReducer,
    ResetPasswordReducer
})
export type RootReducerType = ReturnType<typeof rootReducer>