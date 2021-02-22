import { call, put } from "redux-saga/effects";
import { sendLoginRequest } from "../../api/UserApi";
import { LoginRequest, LoginResponse } from "../../types/api/UserType";
import { _receiveLogin } from "../actions/LoginAction";
import { _receiveSignUp } from "../actions/SignUpAction";

function* loginSaga( { loginRequest, cb } : { loginRequest: LoginRequest, cb: () => void }) {
    const response: LoginResponse = yield call(sendLoginRequest, loginRequest);
    if(response.success){
        cb()
    }
    yield put(_receiveLogin(response));
}

export default loginSaga