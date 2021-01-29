import { Divider } from "antd"
import React, { useCallback, useState } from 'react'
import { useParams } from "react-router-dom"
import MarkableMap from "../components/Map/MarkableAccomodationMap"
import ReadOnlyMap from "../components/Map/ReadOnlyMap"
import ReadOnlyTransportationMap from "../components/Map/ReadOnlyTransportationMap"
import { MapStateType } from "../types/map/MapType"

interface Props {
    planOwnerId: number;
}

const PlanDetailPage = () => {
    const params = useParams()

    return (
        <div className="w-full h-full">
            <Divider>Text</Divider>
        </div>
    )
}

export default PlanDetailPage
