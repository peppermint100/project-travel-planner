import { BasicResponse } from "../../types/api/BasicApiType";
import { LoginRequest, LoginResponse } from "../../types/api/UserType";

export const REQUEST_LOG_IN = "REQUEST_LOG_IN";
export const RECEIVE_LOG_IN = "RECEIVE_LOG_IN";

export const _requestLogin = (loginRequest: LoginRequest, cb: () => void) => ({
    type: REQUEST_LOG_IN,
    loginRequest,
    cb
}) 

export const _receiveLogin = (response: LoginResponse) => ({
    type: RECEIVE_LOG_IN,
    response
})

export type requestLoginActionType = ReturnType<typeof _requestLogin>;
export type receiveLoginActionType = ReturnType<typeof _receiveLogin>;

export type LoginActionType = receiveLoginActionType;

