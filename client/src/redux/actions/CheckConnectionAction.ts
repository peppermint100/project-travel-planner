import { CheckConnectionType } from "../../types/api/CheckConectionType";

export const REQUEST_CHECK_CONNECTION = "REQUEST_CHECK_CONNECTION";
export const RECEIVE_CHECK_CONNECTION = "RECEIVE_CHECK_CONNECTION";

export const _requestCheckConnection = () => (
    {
        type: REQUEST_CHECK_CONNECTION
    }
)

export const _receiveCheckConection = (checkConnectionResult: CheckConnectionType ) => (
    {
        type: RECEIVE_CHECK_CONNECTION,
        checkConnectionResult
    }
) 

export type ReceiveCheckConnectionType = ReturnType<typeof _receiveCheckConection>;

export type CheckConnectionActionType = ReceiveCheckConnectionType; 
