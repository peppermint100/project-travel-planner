import { BasicResponse } from "../../types/api/BasicApiType";
import { ResetPasswordRequest } from "../../types/api/UserType";

export const REQUEST_RESET_PASSWORD = "REQUEST_RESET_PASSWORD";
export const RECEIVE_RESET_PASSWORD = "RECEIVE_RESET_PASSWORD";

export const _requestResetPassword = (resetPasswordRequest: ResetPasswordRequest) => ({
    type: REQUEST_RESET_PASSWORD,
    resetPasswordRequest
}) 

export const _receiveResetPassword = (response: BasicResponse) => ({
    type: RECEIVE_RESET_PASSWORD,
    response
})

export type requestResetPasswordActionType = ReturnType<typeof _requestResetPassword>;
export type receiveResetPasswordActionType = ReturnType<typeof _receiveResetPassword>;

export type ResetPasswordActionType = receiveResetPasswordActionType;


