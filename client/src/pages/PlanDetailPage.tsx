import { Divider } from "antd"
import React, { useCallback, useState } from 'react'
import { useParams } from "react-router-dom"
import MarkableMap from "../components/Map/MarkableMap"
import ReadOnlyMap from "../components/Map/ReadOnlyMap"
import ReadOnlyTransportationMap from "../components/Map/ReadOnlyTransportationMap"
import { MapStateType } from "../types/map/MapType"

interface Props {
    planOwnerId: number;
}

const PlanDetailPage = () => {
    const params = useParams()

    const [startPosition, setStartPosition] = useState<MapStateType>({
        address: "",
        place: "",
        zoom: 15,
        height: 400,
        mapPosition: { lat: 34, lng: 34 },
        markerPosition: { lat: 34, lng: 34 },
    });

    const [endPosition, setEndPosition] = useState<MapStateType>({
        address: "",
        place: "",
        zoom: 15,
        height: 400,
        mapPosition: { lat: 36, lng: 36 },
        markerPosition: { lat: 36, lng: 36 },
    });

    const [mapState, setMapState] = useState<MapStateType>({
        address: "",
        place: "",
        zoom: 15,
        height: 400,
        mapPosition: { lat: 36, lng: 36 },
        markerPosition: { lat: 36, lng: 36 },
    });



    return (
        <div className="w-full h-full">
            <Divider>Text</Divider>
            <MarkableMap mapState={mapState} setMapState={setMapState}/>
        </div>
    )
}

export default PlanDetailPage
