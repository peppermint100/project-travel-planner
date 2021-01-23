import { call, put } from "redux-saga/effects";
import { sendLoginRequest, sendmeRequest } from "../../api/UserApi";
import { LoginRequest, LoginResponse, MeResponse } from "../../types/api/UserType";
import { _receiveLogin } from "../actions/LoginAction";
import { _receiveMe } from "../actions/MeAction";
import { _receiveSignUp } from "../actions/SignUpAction";

function* meSaga() {
    const response: MeResponse = yield call(sendmeRequest);

    yield put(_receiveMe(response));
}

export default meSaga;