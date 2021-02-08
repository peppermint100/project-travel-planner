import { Button, message } from "antd";
import React, {  useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"
import CommonDetailForm from "../components/Form/CommonDetailForm";
import { _setMapState } from "../redux/actions/MapAction";
import { RootReducerType } from "../redux/reducers/rootReducer";
import { DetailType } from "../types/api/DetailType";
import _ from "lodash"
import { IActivityFormAction, _setActivityName, _setActivityTime } from "../redux/actions/ActivityFormAction";
import { AccommodationFormType, TransportationFormType } from "../types/detail/FormType";
import { sendCreateAccommodationRequest, sendCreateActivityRequest, sendCreateTransportationRequest } from "../api/DetailApi";
import { _addAccommodationFeature, _removeAccommodationFeature, _setAccommodationCheckInTime, _setAccommodationCheckOutDate, _setAccommodationCheckOutTime, _setAccommodationName } from "../redux/actions/AccomodationAction";
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
    const accommodationState: AccommodationFormType = useSelector((state: RootReducerType) => state.AccommodationReducer) 
    const transportationState: TransportationFormType = useSelector((state: RootReducerType) => state.TransportationReducer)
    const endMapState = useSelector((state: RootReducerType) => state.EndMapReducer)

    const onClickSubmitButton = async () => {
        console.log('date : ', date)
        console.log('detailType : ', detailType)
        console.log('needs : ', needs)
        console.log('comment : ', comment)
        console.log('map state: ', mapState)
        console.log('activity state: ', activityState)

        if(!date){
            message.warn('날짜 선택은 필수입니다.')
            return
        }

        if(detailType == DetailType.ACTIVITY){
            console.log('activity create request')

            if(!activityState.activityName){
                message.warn('활동의 제목을 입력해주세요.')
                return
            }
            
            const createActivityResponse = await sendCreateActivityRequest(
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
            if(!createActivityResponse.success){
                message.warn(createActivityResponse.msg)
            }
        }
        else if(detailType == DetailType.TRANSPORTATION){
            console.log('transportation create request')

            const createTransportationResponse = await sendCreateTransportationRequest({
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
            if(!createTransportationResponse.success){
                message.warn(createTransportationResponse.msg)
            }

        }else {
            console.log('accomodation request')
            if(!accommodationState.accommodationName){
                message.warn('숙박 시설의 이름을 입력해주세요.')
                return
            }
            const createAccommodationResponse = await sendCreateAccommodationRequest({
                date,
                needs,
                planId: params.planId,
                comment,
                accommodationName: accommodationState.accommodationName,
                locationLat: mapState.mapPosition.lat,
                locationLng: mapState.mapPosition.lng,
                timeCheckIn: accommodationState.checkInTime,
                timeCheckOut: accommodationState.checkOutTime,
                checkOutDate: accommodationState.checkOutDate,
                feature: accommodationState.features
            })
            console.log(accommodationState)
            console.log(createAccommodationResponse)
            if(!createAccommodationResponse.success){
                message.warn(createAccommodationResponse.msg)
            }
        }

        history.push(`/plan/${params.planId}`)
    }

    const onClickCancleButton = () => {
        history.push(`/plan/${params.planId}`)
    }

    return (
        <div className="min-h-screen max-w-xl mx-auto">
            <div className="h-20 bg-primary flex justify-center items-center shadow-md">
                <span className="text-white text-xl font-semibold">{ params.planName }</span>
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
            <div>
                <DetailFormTab dType={detailType} />
            </div>
            <div className="p-3 flex justify-center">
                <button 
                    onClick={onClickSubmitButton}
                    className="px-16 py-3 bg-primary text-white mr-5 text-lg text-semibold rounded-md text-center shadow-2xl"
                >생성 완료</button>
                <button
                    className="px-8 py-3 bg-gray-300 text-white text-lg text-semibold rounded-md text-center shadow-2xl"
                    onClick={onClickCancleButton}
                >취소</button>
            </div>
        </div>
    )
}

export default NewDetailPage
