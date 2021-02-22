import { MapStateType } from './../../types/map/MapType';
export const SET_MAP_STATE = "SET_MAP_STATE"
export const SET_END_MAP_STATE ="SET_END_MAP_STATE"

export const _setMapState = (mapState: MapStateType) => ({
    type: SET_MAP_STATE,
    mapState
})

export const _setEndMapState = (endMapState: MapStateType) => ({
    type: SET_END_MAP_STATE,
    endMapState
})

type setMapStateType = ReturnType<typeof _setMapState>
export type setEndMapStateType = ReturnType<typeof _setEndMapState>

export type MapActionType = setMapStateType