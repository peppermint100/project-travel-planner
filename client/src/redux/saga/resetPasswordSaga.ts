import { sendResetPasswordRequest } from './../../api/UserApi';
import { call, put } from "redux-saga/effects";
import { sendLoginRequest, sendmeRequest } from "../../api/UserApi";
import { BasicResponse } from "../../types/api/BasicApiType";
import { LoginRequest, LoginResponse, MeResponse, ResetPasswordRequest } from "../../types/api/UserType";
import { _receiveLogin } from "../actions/LoginAction";
import { _receiveMe } from "../actions/MeAction";
import { _receiveResetPassword } from "../actions/ResetPasswordAction";
import { _receiveSignUp } from "../actions/SignUpAction";

function* resetPasswordSaga({ resetPasswordRequest } : { resetPasswordRequest: ResetPasswordRequest }) {
    const response: BasicResponse = yield call(sendResetPasswordRequest, resetPasswordRequest);

    yield put(_receiveResetPassword(response));
}

export default resetPasswordSaga;