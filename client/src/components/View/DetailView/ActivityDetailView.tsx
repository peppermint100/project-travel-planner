import { CheckOutlined } from "@ant-design/icons"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Check } from "@material-ui/icons"
import { Divider, Tag } from "antd"
import moment from "moment"
import React from 'react'
import { Activity } from "../../../types/api/DetailType"
import ReadOnlyMap from "../../Map/ReadOnlyMap"
import NeedsView from "./NeedsView"

interface Props {
    detail: Activity
}

const ActivityDetailView: React.FC<Props> = ({ detail }) => {
    console.log('activity detail: ', detail)
    return (
        <div>
            <div>
                <ReadOnlyMap position={detail.location} />
            </div>
            <div className="flex flex-col items-center">
                <div className="text-2xl font-semibold mt-5">
                    { detail.activityName }
                </div>
                <div className="mt-2">
                    <span className="text-md text-gray-400 mr-2">
                        { detail.date }
                    </span>
                    <span className="text-gray-400">
                        { detail.timeStart.substring(0, 5) } ~
                    </span>
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

export default ActivityDetailView
