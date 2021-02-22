import { MapStateType } from './../types/map/MapType';
import Geocode from "react-geocode"
import env from "../configs/env";
import { LEVEL_1, LEVEL_2 } from "./constants";

Geocode.setApiKey(env.GOOGLE_API_KEY!!)

export const getPlaceLevel1 = (addressArray: Array<any>) => {
    for(let i=0; i<addressArray.length; i++){
        for(let j=0; j<addressArray[i].types.length; j++){
            if(addressArray[i].types[j] === LEVEL_1){
                return addressArray[i].long_name;
            }
        }
    }
}
export const getPlaceLevel2 = (addressArray: Array<any>) => {
    for(let i=0; i<addressArray.length; i++){
        for(let j=0; j<addressArray[i].types.length; j++){
            if(addressArray[i].types[j] === LEVEL_2){
                return addressArray[i].long_name;
            }
        }
    }
}

export const onMarkerDragEnd = (e: any, state:MapStateType, setState: (prevState: MapStateType) => void) => {
    let newLat = e.latLng.lat();
    let newLng = e.latLng.lng();

    Geocode.fromLatLng(newLat, newLng)
    .then((response: any) => {
        const address = response.results[0].formatted_address
        const addressArray = response.results[0].address_components
        const place = getPlaceLevel2(addressArray)
        setState({
            ...state,
            address,
            place,
            mapPosition: {
                lat: newLat,
                lng: newLng
            },
            markerPosition: {
                lat: newLat,
                lng: newLng
            }
        })
    })
}

export const onPlaceSelected = (term: any, state: MapStateType, setState: (prevState: MapStateType) => void) => {
    console.log(term)

    const address = term.formatted_address;
    const addressArray = term.address_components;
    const place = getPlaceLevel1(addressArray);
    console.log('place : ', place)
    const lat = term.geometry.location.lat();
    const lng = term.geometry.location.lng();

    setState({
            ...state,
            address,
            place,
            mapPosition: {
                lat,
                lng
            },
            markerPosition: {
                lat,
                lng
            }
    })
}