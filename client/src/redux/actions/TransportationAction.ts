import { TransportationType } from './../../types/api/DetailType';
export const SET_TRANSPORTATION_TYPE = "SET_TRANSPORTATION_TYPE"
export const SET_TRANSPORTATION_TIME_START = "SET_TRANSPORTATION_TIME_START"
export const SET_TRANSPORTATION_TIME_ARRIVE = "SET_TRANSPORTATION_TIME_ARRIVE"

export const _setTransportationType = (tType: TransportationType) => ({
    type: SET_TRANSPORTATION_TYPE,
    tType
})

export const _setTransportationTimeStart = (timeStart: string) => ({
    type: SET_TRANSPORTATION_TIME_START,
    timeStart
})

export const _setTransportationTimeArrive = (timeArrive: string) => ({
    type: SET_TRANSPORTATION_TIME_ARRIVE,
    timeArrive
})

export interface ITransportationAction {
    type: string;
    tType: TransportationType;
    timeStart?: string;
    timeArrive?: string;
}