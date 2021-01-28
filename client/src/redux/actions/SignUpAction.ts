import { BasicResponse } from "../../types/api/BasicApiType";
import { SignUpReqeust } from "../../types/api/UserType";

export const REQUEST_SIGN_UP = "REQUEST_SIGN_UP";
export const RECEIVE_SIGN_UP = "RECEIVE_SIGN_UP";

export const _requestSignUp = (signUpRequest: SignUpReqeust) => ({
    type: REQUEST_SIGN_UP,
    signUpRequest
}) 

export const _receiveSignUp = (response: BasicResponse) => ({
    type: RECEIVE_SIGN_UP,
    response
})

export type requestSignUpActionType = ReturnType<typeof _requestSignUp>;
export type receiveSignUpActionType = ReturnType<typeof _receiveSignUp>;

export type SignUpActionType = receiveSignUpActionType;
