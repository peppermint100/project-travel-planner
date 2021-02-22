import { MapActionType, SET_MAP_STATE } from "../actions/MapAction";
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

const MapReducer = (state = initialState, action: MapActionType) => {
    switch(action.type){
        case SET_MAP_STATE:
            return action.mapState;
        default:
            return state;
    }
}

export default MapReducer;