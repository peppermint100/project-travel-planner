import React, { useState } from 'react'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import env from "../../configs/env";
import { MapStateType } from "../../types/map/MapType";
import {  onMarkerDragEnd } from "../../utils/map";


const ReadOnlyMap = () => {
    const [mapState, setMapState] = useState<MapStateType>({
        address: "",
        place: "",
        zoom: 15,
        height: 400,
        mapPosition: { lat: -34.397, lng: 150.644 },
        markerPosition: { lat: -34.397, lng: 150.644 },
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
                draggable={true}
                onDragEnd={(e) => {
                    onMarkerDragEnd(e, mapState, setMapState)
                }}
                position={{ lat: mapState.mapPosition.lat, lng: mapState.mapPosition.lng }}
            >
                <InfoWindow>
                    <div>{mapState.place}</div>
                </InfoWindow>
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


