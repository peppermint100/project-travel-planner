import React, { useEffect, useState } from 'react'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import env from "../../configs/env";
import { MapStateType, Position } from "../../types/map/MapType";
import { onMarkerDragEnd, onPlaceSelected } from "../../utils/map";

import AutoComplete from "react-google-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerType } from "../../redux/reducers/rootReducer";
import { _setMapState } from "../../redux/actions/MapAction";
import { Divider } from "antd";

interface Props {
    mapState: MapStateType;
    setMapState: (prevState:MapStateType) => void;
}

const MarkableMap: React.FC<Props> = ({mapState, setMapState}) => {

    const MapWithAMarker: React.ComponentClass<any, string | Element> = withScriptjs(withGoogleMap(props =>
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: mapState.mapPosition.lat, lng: mapState.mapPosition.lng }}
            options={{
                streetViewControl: false,
                mapTypeControl: false
            }}
        >
            <AutoComplete
                className="w-full p-2"
                placeholder=" 주소로 검색"
                onPlaceSelected={(term: any) => {
                    onPlaceSelected(term, mapState, setMapState)
                }}
            />
            <Marker
                draggable={true}
                position={{ lat: mapState.mapPosition.lat, lng: mapState.mapPosition.lng }}
                onDragEnd={(e) => {
                    onMarkerDragEnd(e, mapState, setMapState)
                }}
            >
                <InfoWindow>
                    <div>{mapState.place}</div>
                </InfoWindow>
            </Marker>
         
        </GoogleMap>
    ));

    return (
        <div className="w-full h-full pb-10">
            <MapWithAMarker
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${env.GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    )
}

export default React.memo(MarkableMap);



