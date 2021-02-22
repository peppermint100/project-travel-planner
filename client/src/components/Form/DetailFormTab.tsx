import React from 'react'
import _ from "lodash"
import { _setMapState } from "../../redux/actions/MapAction";
import { _setActivityName, _setActivityTime } from "../../redux/actions/ActivityFormAction";
import { DetailType} from "../../types/api/DetailType";
import ActivityForm from "./ActivityForm";
import TransportationForm from "./TransportationForm";
import AccomodationForm from "./AccommodationForm";

const DetailFormTab: React.FC<{dType: DetailType}> = ({ dType }) => {
    switch(dType){
        case DetailType.ACTIVITY:
            return <ActivityForm />
        case DetailType.ACCOMMODATION:
            return <AccomodationForm />
        case DetailType.TRANSPORTATION:
            return <TransportationForm />
        default:
            return <AccomodationForm />
    }
}

export default React.memo(DetailFormTab);