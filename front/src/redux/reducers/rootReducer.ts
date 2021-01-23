import { combineReducers } from "redux";
import CheckConeectionReducer from "./CheckConnectionReducer";
import SignUpReducer from "./SignUpReducer";
import LoginReducer from "./LoginReducer";
import MeReducer from "./MeReducer"

export const rootReducer = combineReducers({
    CheckConeectionReducer,
    SignUpReducer,
    LoginReducer,
    MeReducer
})
export type RootReducerType = ReturnType<typeof rootReducer>