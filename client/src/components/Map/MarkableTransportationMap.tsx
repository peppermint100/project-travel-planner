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
import {  onMarkerDragEnd, onPlaceSelected } from "../../utils/map";
import AutoComplete from "react-google-autocomplete"

interface Props {
    startMapState: MapStateType;
    setStartMapState: (prevState:MapStateType) => void;
    endMapState: MapStateType;
    setEndMapState: (prevState:MapStateType) => void;
}

const MarkableTransportationMap: React.FC<Props> = ({ startMapState, setStartMapState, endMapState, setEndMapState }) => {

    const MapWithAMarker: React.ComponentClass<any, string | Element> = withScriptjs(withGoogleMap(props =>
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: endMapState.mapPosition.lat, lng: endMapState.mapPosition.lng }}
            options={{
                streetViewControl: false,
                mapTypeControl: false
            }}
        >
            <Marker
                draggable={true}
                position={{ lat: startMapState.mapPosition.lat, lng: startMapState.mapPosition.lng }}
                onDragEnd={(e) => {
                    onMarkerDragEnd(e, startMapState, setStartMapState)
                }}
            >
                <InfoWindow>
                    <div>출발 지점{startMapState.place}</div>
                </InfoWindow>
            </Marker>
            <Marker
                draggable={true}
                position={{ lat: endMapState.mapPosition.lat, lng: endMapState.mapPosition.lng }}
                onDragEnd={(e) => {
                    onMarkerDragEnd(e, endMapState, setEndMapState)
                }}
            >
                <InfoWindow>
                    <div>도착 지점{endMapState.place}</div>
                </InfoWindow>
            </Marker>
            <AutoComplete
                onPlaceSelected={(term: any) => {
                    onPlaceSelected(term, startMapState, setStartMapState)
                }}
            />
            <AutoComplete
                onPlaceSelected={(term: any) => {
                    onPlaceSelected(term, endMapState, setEndMapState)
                }}
            />
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

export default MarkableTransportationMap;




