import { BasicResponse } from "../../types/api/BasicApiType";
import { MeResponse } from "../../types/api/UserType";

export const REQUEST_ME = "REQUEST_ME";
export const RECEIVE_ME = "RECEIVE_ME";

export const _requestMe = () => ({
    type: REQUEST_ME
}) 

export const _receiveMe = (response: MeResponse) => ({
    type: RECEIVE_ME,
    response
})

export type requestMeActionType = ReturnType<typeof _requestMe>;
export type receiveMeActionType = ReturnType<typeof _receiveMe>;

export type MeActionType = receiveMeActionType;

