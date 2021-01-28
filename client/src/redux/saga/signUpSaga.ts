import { call, put } from "redux-saga/effects";
import { sendSignUpRequest } from "../../api/UserApi";
import { BasicResponse } from "../../types/api/BasicApiType";
import { SignUpReqeust } from "../../types/api/UserType";
import { _receiveSignUp } from "../actions/SignUpAction";

function* signUpSaga( { signUpRequest } : { signUpRequest: SignUpReqeust }) {
    console.log("from saga: ", signUpRequest.email, signUpRequest.name)
    const response: BasicResponse = yield call(sendSignUpRequest, signUpRequest);

    yield put(_receiveSignUp(response));
}

export default signUpSaga;