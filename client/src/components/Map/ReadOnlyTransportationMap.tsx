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

interface Props {
    startPosition: Position,
    endPosition: Position
}

const ReadOnlyTransportationMap: React.FC<Props> = ({ startPosition, endPosition }) => {
    const [mapState, _] = useState<MapStateType>({
        address: "",
        place: "",
        zoom: 15,
        height: 400,
        mapPosition: endPosition,
        markerPosition: endPosition,
    });

    console.log("mapState: ", mapState)

    const MapWithAMarker: React.ComponentClass<any, string | Element> = withScriptjs(withGoogleMap(props =>
        <GoogleMap
            defaultZoom={8}
            defaultCenter={endPosition}
            options={{
                streetViewControl: false,
                mapTypeControl: false
            }}
        >
            <Marker
                draggable={false}
                position={startPosition}
            >
                <InfoWindow>
                    <div>출발 지점</div>
                </InfoWindow>
            </Marker>
            <Marker
                draggable={false}
                position={endPosition}
            >
                <InfoWindow>
                    <div>도착 지점</div>
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

export default ReadOnlyTransportationMap;


