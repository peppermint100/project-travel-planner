import { setEndMapStateType, SET_END_MAP_STATE } from "../actions/MapAction";
import { MapStateType } from './../../types/map/MapType';

const initialState: MapStateType = {
    address: "",
    place: "",
    zoom: 15,
    height: 400,
    mapPosition: {
        lat: 34,
        lng: 34
    },
    markerPosition: {
        lat: 34,
        lng: 34
    }
}

const EndMapReducer = (state = initialState, action: setEndMapStateType) => {
    switch(action.type){
        case SET_END_MAP_STATE:
            return action.endMapState;
        default:
            return state;
    }
}

export default EndMapReducer;