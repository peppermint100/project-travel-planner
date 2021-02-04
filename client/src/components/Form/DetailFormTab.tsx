import React from 'react'
import _ from "lodash"
import { _setMapState } from "../../redux/actions/MapAction";
import { _setActivityName, _setActivityTime } from "../../redux/actions/ActivityFormAction";
import { DetailType} from "../../types/api/DetailType";
import { _addAccomodationFeature, _removeAccomodationFeature, _setAccomodationCheckInTime, _setAccomodationCheckOutDate, _setAccomodationCheckOutTime, _setAccomodationName } from "../../redux/actions/AccomodationAction";
import ActivityForm from "./ActivityForm";
import TransportationForm from "./TransportationForm";
import AccomodationForm from "./AccomodationForm";

const DetailFormTab: React.FC<{dType: DetailType}> = ({ dType }) => {
    switch(dType){
        case DetailType.ACTIVITY:
            return <ActivityForm />
        case DetailType.ACCOMODATION:
            return <AccomodationForm />
        case DetailType.TRANSPORTATION:
            return <TransportationForm />
        default:
            return <AccomodationForm />
    }
}

export default React.memo(DetailFormTab);