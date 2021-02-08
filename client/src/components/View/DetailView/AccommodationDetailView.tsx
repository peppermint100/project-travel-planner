import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Divider, Tag } from "antd"
import React from 'react'
import { Accommodation } from "../../../types/api/DetailType"
import ReadOnlyMap from "../../Map/ReadOnlyMap"
import LabeledDetailInfo from "./LabeledDetailInfo"
import NeedsView from "./NeedsView"

interface Props {
    detail: Accommodation
}

const AccommodationDetailView: React.FC<Props> = ({ detail }) => {
    return (
     <div>
            <div>
                <ReadOnlyMap position={detail.location} />
            </div>
            <div className="flex flex-col items-center">
                <div className="text-2xl font-semibold mt-5">
                    { detail.accommodationName }
                </div>
                <div className="mt-2 flex">
                    <div className="">
                        <span className="text-md text-gray-400 mr-2">
                            { detail.date }
                        </span>
                        <span className="text-gray-400">
                            { detail.timeCheckIn.substring(0, 5) } ~ 
                        </span>
                    </div>
                    <div className="ml-1">
                        <span className="text-md text-gray-400 mr-2">
                            { detail.checkOutDate }
                        </span>
                        <span className="text-gray-400">
                            { detail.timeCheckOut.substring(0, 5) }
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
                <NeedsView needs={detail.needs} />
            </div>
        </div>
    )
}

export default AccommodationDetailView
