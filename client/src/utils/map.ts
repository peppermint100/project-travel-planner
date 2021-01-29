import { MapStateType } from './../types/map/MapType';
import Geocode from "react-geocode"
import env from "../configs/env";

const LEVEL = "administrative_area_level_2"
Geocode.setApiKey(env.GOOGLE_API_KEY!!)

export const getPlace = (addressArray: Array<any>) => {
    for(let i=0; i<addressArray.length; i++){
        for(let j=0; j<addressArray[i].types.length; j++){
            if(addressArray[i].types[j] == LEVEL){
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
        console.log("marker dragend response : ", response)
        const address = response.results[0].formatted_address
        const addressArray = response.results[0].address_components
        const place = getPlace(addressArray)
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