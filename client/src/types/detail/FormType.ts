import { TransportationType } from './../api/DetailType';
import { Feature } from "../api/DetailType"

export type ActivitiyFormType = {
    activityName: string,
    time: string,
}

export type AccomodationFormType = {
    accomodationName: string;
    checkOutDate: string;
    checkInTime: string;
    checkOutTime: string;
    features: Array<Feature>
}

export type TransportationFormType = {
    timeStart: string,
    timeArrive: string,
    transportationType: TransportationType
}
