import { TakeableChannel } from "redux-saga";
import { takeLatest } from "redux-saga/effects";
import { REQUEST_CHECK_CONNECTION } from "./actions/CheckConnectionAction";
import { REQUEST_LOG_IN } from "./actions/LoginAction";
import { REQUEST_SIGN_UP } from "./actions/SignUpAction";
import checkConnectionSaga from "./saga/checkConnectionSaga";
import signUpSaga from "./saga/signUpSaga";
import loginSaga from "./saga/loginSaga";
import { REQUEST_ME } from "./actions/MeAction";
import meSaga from "./saga/meSaga";

export default function* mySaga() {
    yield takeLatest(REQUEST_CHECK_CONNECTION, checkConnectionSaga);
    yield takeLatest(REQUEST_SIGN_UP as unknown as TakeableChannel<unknown>, signUpSaga)
    yield takeLatest(REQUEST_LOG_IN as unknown as TakeableChannel<unknown>, loginSaga)
    yield takeLatest(REQUEST_ME as unknown as TakeableChannel<unknown>, meSaga)
}