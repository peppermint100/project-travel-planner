import { Action } from "redux"

export const SET_ACTIVITY_NAME = "SET_ACTIVITY_NAME"
export const SET_ACTIVITY_TIME = "SET_ACTIVITY_TIME"

export const _setActivityName = (activityName: string) => ({
    type: SET_ACTIVITY_NAME,
    activityName
})

export const _setActivityTime = (time: string) => ({
    type: SET_ACTIVITY_NAME,
    time
})

export interface IActivityFormAction {
    type: string;
    activityName?: string;
    time?: string; 
}
