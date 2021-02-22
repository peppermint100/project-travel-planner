import { combineReducers } from "redux";
import CheckConeectionReducer from "./CheckConnectionReducer";
import SignUpReducer from "./SignUpReducer";
import LoginReducer from "./LoginReducer";
import MeReducer from "./MeReducer"
import ResetPasswordReducer from "./ResetPasswordReducer"
import GetAllPlansReducer from "./GetAllPlansReducer"
import MapReducer from "./MapReducer"
import ActivityFormReducer from "./ActivityFormReducer"
import AccommodationReducer from "./AccommodationReducer"
import EndMapReducer from "./EndMapReducer"
import TransportationReducer from "./TransportationReducer"

export const rootReducer = combineReducers({
    CheckConeectionReducer,
    SignUpReducer,
    LoginReducer,
    MeReducer,
    ResetPasswordReducer,
    GetAllPlansReducer,
    MapReducer,
    ActivityFormReducer,
    AccommodationReducer,
    EndMapReducer,
    TransportationReducer
})

export type RootReducerType = ReturnType<typeof rootReducer>