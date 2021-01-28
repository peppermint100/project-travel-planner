import { REQUEST_GET_ALL_PLANS } from './actions/GetAllPlansAction';
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
import { REQUEST_RESET_PASSWORD } from "./actions/ResetPasswordAction";
import resetPasswordSaga from "./saga/resetPasswordSaga";
import getAllPlansSaga from './saga/getAllPlansSaga';

export default function* mySaga() {
    yield takeLatest(REQUEST_CHECK_CONNECTION, checkConnectionSaga);
    yield takeLatest(REQUEST_SIGN_UP as unknown as TakeableChannel<unknown>, signUpSaga)
    yield takeLatest(REQUEST_LOG_IN as unknown as TakeableChannel<unknown>, loginSaga)
    yield takeLatest(REQUEST_ME as unknown as TakeableChannel<unknown>, meSaga)
    yield takeLatest(REQUEST_RESET_PASSWORD as unknown as TakeableChannel<unknown>, resetPasswordSaga)
    yield takeLatest(REQUEST_GET_ALL_PLANS as unknown as TakeableChannel<unknown>, getAllPlansSaga)
}