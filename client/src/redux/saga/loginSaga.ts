import { call, put } from "redux-saga/effects";
import { sendLoginRequest } from "../../api/UserApi";
import { LoginRequest, LoginResponse } from "../../types/api/UserType";
import { _receiveLogin } from "../actions/LoginAction";
import { _receiveSignUp } from "../actions/SignUpAction";

function* loginSaga( { loginRequest } : { loginRequest: LoginRequest }) {
    console.log("from saga: ", loginRequest.email)
    const response: LoginResponse = yield call(sendLoginRequest, loginRequest);

    yield put(_receiveLogin(response));
}

export default loginSaga