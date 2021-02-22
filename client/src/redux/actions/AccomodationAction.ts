import { Feature } from './../../types/api/DetailType';
export const SET_ACCOMMODATION_NAME = "SET_ACCOMMODATION_NAME"
export const SET_ACCOMMODATION_CHECK_IN_TIME = "SET_ACCOMMODATION_CHECK_IN_TIME"
export const SET_ACCOMMODATION_CHECK_OUT_TIME = "SET_ACCOMMODATION_CHECK_OUT_TIME"
export const SET_ACCOMMODATION_CHECK_OUT_DATE = "SET_ACCOMMODATION_CHECK_OUT_DATE"
export const ADD_ACCOMMODATION_FEATURE = "ADD_ACCOMMODATION_FEATURE"
export const REMOVE_ACCOMMODATION_FEATURE = "REMOVE_ACCOMMODATION_FEATURE"

export const _setAccommodationName = (accommodationName: string) => ({
    type: SET_ACCOMMODATION_NAME,
    accommodationName
})

export const _setAccommodationCheckInTime = (checkInTime: string) => ({
    type: SET_ACCOMMODATION_CHECK_IN_TIME,
    checkInTime
})

export const _setAccommodationCheckOutTime = (checkOutTime: string) => ({
    type: SET_ACCOMMODATION_CHECK_OUT_TIME,
    checkOutTime
})

export const _setAccommodationCheckOutDate = (checkOutDate: string) => ({
    type: SET_ACCOMMODATION_CHECK_OUT_DATE,
    checkOutDate
})

export const _addAccommodationFeature = (addedFeature: Feature) => ({
    type: ADD_ACCOMMODATION_FEATURE,
    addedFeature
})

export const _removeAccommodationFeature = (removedFeature: Feature) => ({
    type: REMOVE_ACCOMMODATION_FEATURE,
    removedFeature
})

export interface IAccommodationFormAction {
    type: string;
    accommodationName?: string;
    checkOutDate?: string;
    checkInTime?: string;
    checkOutTime?: string;
    addedFeature?: Feature;
    removedFeature?: Feature;
}