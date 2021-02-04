import { Button } from "antd";
import React, {  useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"
import CommonDetailForm from "../components/Form/CommonDetailForm";
import { _setMapState } from "../redux/actions/MapAction";
import { RootReducerType } from "../redux/reducers/rootReducer";
import { DetailType } from "../types/api/DetailType";
import _ from "lodash"
import { IActivityFormAction, _setActivityName, _setActivityTime } from "../redux/actions/ActivityFormAction";
import { AccomodationFormType, TransportationFormType } from "../types/detail/FormType";
import { sendCreateAccomodationRequest, sendCreateActivityRequest, sendCreateTransportationRequest } from "../api/DetailApi";
import { _addAccomodationFeature, _removeAccomodationFeature, _setAccomodationCheckInTime, _setAccomodationCheckOutDate, _setAccomodationCheckOutTime, _setAccomodationName } from "../redux/actions/AccomodationAction";
import DetailFormTab from "../components/Form/DetailFormTab";

const NewDetailPage = () => {

    const params = useParams<{ planId: string, planName: string }>()
    const history = useHistory()
    const [date, setDate] = useState("");
    const [detailType, setDetailType] = useState(DetailType.TRANSPORTATION);
    const [needs, setNeeds] = useState<Array<string>>([]);
    const [comment, setComment] = useState("");
    const mapState = useSelector((state: RootReducerType) => state.MapReducer)
    const activityState: IActivityFormAction = useSelector((state: RootReducerType) => state.ActivityFormReducer)
    const accomodationState: AccomodationFormType = useSelector((state: RootReducerType) => state.AccomodationReducer) 
    const transportationState: TransportationFormType = useSelector((state: RootReducerType) => state.TransportationReducer)
    const endMapState = useSelector((state: RootReducerType) => state.EndMapReducer)

    const onClickSubmitButton = () => {
        console.log('date : ', date)
        console.log('detailType : ', detailType)
        console.log('needs : ', needs)
        console.log('comment : ', comment)
        console.log('map state: ', mapState)
        console.log('activity state: ', activityState)

        if(detailType == DetailType.ACTIVITY){
            console.log('activity create request')
            
            const createActivityResponse = sendCreateActivityRequest(
                { date, 
                needs, 
                planId: params.planId,
                comment,
                locationLat: mapState.mapPosition.lat,
                locationLng: mapState.mapPosition.lng,
                activityName: activityState.activityName!!,
                timeStart: activityState.time!!
            })

            console.log("create activity response: ", createActivityResponse)
        }
        else if(detailType == DetailType.TRANSPORTATION){
            console.log('transportation create request')

            const createTransportationResponse = sendCreateTransportationRequest({
                date,
                needs,
                planId: params.planId,
                comment,
                transportationType: transportationState.transportationType,
                timeStart: transportationState.timeStart,
                timeArrive: transportationState.timeArrive,
                locationStartLat: mapState.mapPosition.lat,
                locationStartLng: mapState.mapPosition.lng,
                locationArriveLat: endMapState.mapPosition.lat,
                locationArriveLng: endMapState.mapPosition.lng
            })

            console.log(transportationState)
            console.log('transportation response: ', createTransportationResponse)

        }else {
            console.log('accomodation request')
            const createAccomodationResponse = sendCreateAccomodationRequest({
                date,
                needs,
                planId: params.planId,
                comment,
                accomodationName: accomodationState.accomodationName,
                locationLat: mapState.mapPosition.lat,
                locationLng: mapState.mapPosition.lng,
                timeCheckIn: accomodationState.checkInTime,
                timeCheckOut: accomodationState.checkOutTime,
                checkOutDate: accomodationState.checkOutDate,
                feature: accomodationState.features
            })

            console.log(createAccomodationResponse)
        }
    }

    const onClickCancleButton = () => {
        history.push(`/plan/${params.planId}`)
    }

    return (
        <div className="min-h-screen">
            <div>
                { params.planName }
            </div>
            <div>
                <CommonDetailForm 
                    date={date} 
                    detailType={detailType}
                    needs={needs}
                    comment={comment}
                    onChangeDate={(date: string) => {
                        setDate(date)
                    }}
                    onChangeDetailType={(dType: DetailType) => {
                        setDetailType(dType)
                    }}
                    onConfirmNeeds={(needs: Array<string>) => {
                        setNeeds(needs)
                    }} 
                    onChangeComment={(comment: string) => {
                        setComment(comment)
                    }}
                />
            </div>
            <div className="my-10">
                <DetailFormTab dType={detailType} />
            </div>
            <div>
                <Button onClick={onClickSubmitButton}>생성완료</Button>
                <Button onClick={onClickCancleButton}>취소</Button>
            </div>
        </div>
    )
}

export default NewDetailPage
