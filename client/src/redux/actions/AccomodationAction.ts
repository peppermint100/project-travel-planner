import { Feature } from './../../types/api/DetailType';
export const SET_ACCOMODATION_NAME = "SET_ACCOMODATION_NAME"
export const SET_ACCOMODATION_CHECK_IN_TIME = "SET_ACCOMODATION_CHECK_IN_TIME"
export const SET_ACCOMODATION_CHECK_OUT_TIME = "SET_ACCOMODATION_CHECK_OUT_TIME"
export const SET_ACCOMODATION_CHECK_OUT_DATE = "SET_ACCOMODATION_CHECK_OUT_DATE"
export const ADD_ACCOMODATION_FEATURE = "ADD_ACCOMODATION_FEATURE"
export const REMOVE_ACCOMODATION_FEATURE = "REMOVE_ACCOMODATION_FEATURE"

export const _setAccomodationName = (accomodationName: string) => ({
    type: SET_ACCOMODATION_NAME,
    accomodationName
})

export const _setAccomodationCheckInTime = (checkInTime: string) => ({
    type: SET_ACCOMODATION_CHECK_IN_TIME,
    checkInTime
})

export const _setAccomodationCheckOutTime = (checkOutTime: string) => ({
    type: SET_ACCOMODATION_CHECK_OUT_TIME,
    checkOutTime
})

export const _setAccomodationCheckOutDate = (checkOutDate: string) => ({
    type: SET_ACCOMODATION_CHECK_OUT_DATE,
    checkOutDate
})

export const _addAccomodationFeature = (addedFeature: Feature) => ({
    type: ADD_ACCOMODATION_FEATURE,
    addedFeature
})

export const _removeAccomodationFeature = (removedFeature: Feature) => ({
    type: REMOVE_ACCOMODATION_FEATURE,
    removedFeature
})

export interface IAccomodationFormAction {
    type: string;
    accomodationName?: string;
    checkOutDate?: string;
    checkInTime?: string;
    checkOutTime?: string;
    addedFeature?: Feature;
    removedFeature?: Feature;
}