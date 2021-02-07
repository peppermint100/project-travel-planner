import { Plan } from './PlanType';
import { Position } from './../map/MapType';

export enum DetailType {
    TRANSPORTATION = "TRANSPORTATION",
    ACCOMMODATION = "ACCOMMODATION",
    ACTIVITY = "ACTIVITY" 
}

export enum TransportationType {
    BUS = "BUS",
    SUBWAY = "SUBWAY",
    TAXI = "TAXI",
    WALK = "WALK",
    AIRPLANE = "AIRPLANE" 
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
    timeStart: string;
    timeArrive: string;
}

export interface Detail {
    detailId: number;
    date: string;
    needs: Array<string>;
    planId: number;
    comment: string;
    detailType: DetailType;
}

export interface Transportation extends Detail {
    locationStart: Position;
    locationArrive: Position;
    timeStart: string;
    timeArrive: string;
    transportationType: TransportationType; 
}

export interface Activity extends Detail {
    activityName: string;
    location: Position;
    timeStart: string;
}

export interface Accommodation extends Detail {
    accommodationName: string;
    checkOutDate: string;
    feature: Array<Feature>;
    location: Position;
    timeCheckIn: string;
    timeCheckOut: string;
}

export type CreateActivityRequest = {
    locationLat: number,
    locationLng: number,
    activityName: string,
    timeStart: string
} & CreateDetailType

export type CreateAccommodationRequest = {
    locationLat: number,
    locationLng: number,
    accommodationName: string,
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
