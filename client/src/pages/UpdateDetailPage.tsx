
import message from "antd/lib/message"
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { sendGetDetailByDetailIdReqeust, sendUpdateAccomodationRequest, sendUpdateActivityRequest, sendUpdateTransportationRequest } from "../api/DetailApi"
import DetailFormTab from "../components/Form/DetailFormTab"
import { RootReducerType } from "../redux/reducers/rootReducer"
import { CreateAccommodationRequest, CreateActivityRequest, CreateTransportationRequest, DetailType } from "../types/api/DetailType"
import { AccommodationFormType, ActivitiyFormType, TransportationFormType } from "../types/detail/FormType"

const UpdateDetailPage = () => {
    const history = useHistory()
    const { detailId, planId, detailType } = useParams<{ detailId: string, planId: string, detailType: string }>()
    const [date, setDate] = useState("");
    const [needs, setNeeds] = useState<Array<string>>([]);
    const [comment, setComment] = useState("")

    const mapState = useSelector((state: RootReducerType) => state.MapReducer)
    const activityState: ActivitiyFormType = useSelector((state: RootReducerType) => state.ActivityFormReducer)
    const accomodationState: AccommodationFormType = useSelector((state: RootReducerType) => state.AccommodationReducer)
    const transportationState: TransportationFormType = useSelector((state: RootReducerType) => state.TransportationReducer)
    const endMapState = useSelector((state: RootReducerType) => state.EndMapReducer)

    const submitUpdate = () => {
        if(detailType === DetailType.ACTIVITY){
            const updateRequestInput: CreateActivityRequest = {
                date,
                needs,
                planId,
                comment,
                locationLat: mapState.mapPosition.lat,
                locationLng: mapState.mapPosition.lng,
                activityName: activityState.activityName,
                timeStart: activityState.time
            }

            sendUpdateActivityRequest(detailId, updateRequestInput)
            .then(response => {
                if(response.success){
                    history.push(`/plan/${planId}/detail/${detailId}/${detailType}`)
                }else {
                    message.warn(response.msg)
                }
            })
        }else if(detailType == DetailType.ACCOMMODATION){
            const updateRequestInput: CreateAccommodationRequest = {
                date,
                needs,
                planId,
                comment,
                accommodationName: accomodationState.accommodationName,
                checkOutDate: accomodationState.checkOutDate,
                feature: accomodationState.features,
                timeCheckIn: accomodationState.checkInTime,
                timeCheckOut: accomodationState.checkOutTime,
                locationLat: mapState.mapPosition.lat,
                locationLng: mapState.mapPosition.lng,
            }

            sendUpdateAccomodationRequest(detailId, updateRequestInput)
                .then(response => {
                    if(response.success){
                        history.push(`/plan/${planId}/detail/${detailId}/${detailType}`)
                    }else {
                        message.warn(response.msg)
                    }
                })
        }else{ 
            const updateRequestInput: CreateTransportationRequest = {
                date,
                needs,
                planId,
                comment,
                locationStartLat: mapState.mapPosition.lat,
                locationStartLng: mapState.mapPosition.lng,
                locationArriveLat: endMapState.mapPosition.lat,
                locationArriveLng: endMapState.mapPosition.lng,
                timeStart: transportationState.timeStart,
                timeArrive: transportationState.timeArrive,
                transportationType: transportationState.transportationType
            }

            sendUpdateTransportationRequest(detailId, updateRequestInput)
                .then(response => {
                    if(response.success){
                        history.push(`/plan/${planId}/detail/${detailId}/${detailType}`)
                    }else {
                        message.warn(response.msg)
                    }
                })
        }
    }

    const cancelUpdate = () => {
        history.push(`/plan/${planId}/detail/${detailId}/${detailType}`)
    }

    useEffect(() => {
        sendGetDetailByDetailIdReqeust(detailId)
        .then(response => {
            console.log(response)
            setDate(response.date)
            setNeeds(response.needs)
            setComment(response.comment)
        })
    }, [])

    return (
        <div className="h-screen flex flex-col justify-between">
            <div className="h-20 bg-primary flex justify-center items-center shadow-md">
                <span className="text-white text-xl font-semibold">계획 수정하기</span>
            </div>
            <DetailFormTab dType={detailType as DetailType} />
            <div className="p-3 flex justify-center">
                <button 
                    onClick={submitUpdate}
                    className="px-16 py-3 bg-primary text-white mr-5 text-lg text-semibold rounded-md text-center shadow-2xl"
                >수정 완료</button>
                <button
                    className="px-8 py-3 bg-gray-300 text-white text-lg text-semibold rounded-md text-center shadow-2xl"
                    onClick={cancelUpdate}
                >취소</button>
            </div>
        </div>
    )
}

export default UpdateDetailPage
