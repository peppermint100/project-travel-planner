import { Divider } from "antd"
import React, { useEffect, useState } from 'react'
import { Transportation, TransportationType } from "../../../types/api/DetailType"
import ReadOnlyTransportationMap from "../../Map/ReadOnlyTransportationMap"
import ListView from "./ListView"

interface Props {
    detail: Transportation
}

const TransportationDetailView: React.FC<Props> = ({ detail }) => {
    const [title, setTitle] = useState("");
    
    useEffect(() => {
        switch(detail.transportationType){
            case TransportationType.WALK:
                setTitle("도보로 이동");
                return;
            case TransportationType.BUS:
                setTitle("버스로 이동");
                return;
            case TransportationType.TAXI:
                setTitle("택시로 이동");
                return;
            case TransportationType.AIRPLANE:
                setTitle("비행기로 이동");
                return;
            case TransportationType.SUBWAY:
                setTitle("지하철(전철)로 이동");
                return;
            default:
                return;
            }
    }, [])

    return (
        <div>
            <div>
                <ReadOnlyTransportationMap startPosition={detail.locationStart} endPosition={detail.locationArrive} />
            </div>
           <div className="flex flex-col items-center">
                <div className="text-2xl font-semibold mt-5">
                    { title }
                </div>
                <div className="mt-2 flex">
                    <div className="">
                        <span className="text-md text-gray-400 mr-2">
                            { detail.date }
                        </span>
                        <span className="text-gray-400">
                            { detail.timeStart.substring(0, 5) } ~ 
                        </span>
                    </div>
                    <div className="ml-1">
                        <span className="text-md text-gray-400 mr-2">
                            { detail.date }
                        </span>
                        <span className="text-gray-400">
                            { detail.timeArrive.substring(0, 5) }
                        </span>
                    </div>
                </div>
            </div>
            <Divider />
            <div className="w-3/4 mx-auto font-semibold text-gray-500 h-40">
                { detail.comment }
            </div>
            <Divider />
            <div className="ml-6">
                <ListView contents={detail.needs} />
            </div>
        </div>
    )
}

export default TransportationDetailView
