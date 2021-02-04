import { Plan } from './PlanType';
import { Position } from './../map/MapType';

export enum DetailType {
    TRANSPORTATION = 0,
    ACCOMODATION = 1,
    ACTIVITY = 2
}

export enum TransportationType {
    BUS = 0,
    SUBWAY = 1,
    TAXI = 2,
    WALK = 3,
    AIRPLANE = 4
}

export type GetPlanByPlanIdResponseType = {
    success: boolean,
    plan: Plan,
    msg: string,
    details: Array<Detail>
}

export type CreateDetailType = {
    date: string,
    needs: Array<string>,
    planId: string,
    comment: string,
} 

export interface CreateTransportationType extends CreateDetailType {
    transportationType: TransportationType;
    locationStartLat: number;
    locationStartLng: number;
    locationArriveLat: number;
    locationArriveLng: number;
    timeStart: Date;
    timeArrive: Date;
}

export interface Detail {
    detailId: number;
    date: Date;
    needs: Array<string>;
    planId: number;
    comment: string;
    detailType: DetailType;
}

export interface Transportation extends Detail {
    locationStart: Position;
    locationArrive: Position;
    timeStart: Date;
    timeArrive: Date;
    transportationType: TransportationType; 
}

export type CreateActivityRequest = {
    locationLat: number,
    locationLng: number,
    activityName: string,
    timeStart: string
} & CreateDetailType

export type CreateAccomodationRequest = {
    locationLat: number,
    locationLng: number,
    accomodationName: string,
    timeCheckIn: string,
    timeCheckOut: string,
    checkOutDate: string,
    feature: Array<Feature>
} & CreateDetailType

export type CreateTransportationRequest = {
    locationStartLat: number,
    locationStartLng: number,
    locationArriveLat: number,
    locationArriveLng: number,
    timeStart: string,
    timeArrive: string
    transportationType: TransportationType
} & CreateDetailType

export enum Feature {
    WIFI=0,
    AIR_CONDITIONING=1,
    HAIR_DRYER=2,
    PARKING=3,
    BED=4,
    HOT_WATER=5,
    KITCHEN=6,
    TV=7,
    HEATER=8
}
