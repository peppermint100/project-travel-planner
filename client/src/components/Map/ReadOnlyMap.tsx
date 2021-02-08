import React, { useState } from 'react'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import env from "../../configs/env";
import { MapStateType, Position } from "../../types/map/MapType";
import {  onMarkerDragEnd } from "../../utils/map";

interface Props {
    position: Position
}

const ReadOnlyMap: React.FC<Props> = ({ position }) => {
    const [mapState, _] = useState<MapStateType>({
        address: "",
        place: "",
        zoom: 15,
        height: 400,
        mapPosition: position,
        markerPosition: position,
    });

    console.log("mapState: ", mapState)

    const MapWithAMarker: React.ComponentClass<any, string | Element> = withScriptjs(withGoogleMap(props =>
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: mapState.mapPosition.lat, lng: mapState.mapPosition.lng }}
            options={{
                streetViewControl: false,
                mapTypeControl: false
            }}
        >
            <Marker
                draggable={false}
                position={{ lat: mapState.mapPosition.lat, lng: mapState.mapPosition.lng }}
            >
            </Marker>
        </GoogleMap>
    ));

    return (
        <div>
            <MapWithAMarker
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${env.GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    )
}

export default ReadOnlyMap;

