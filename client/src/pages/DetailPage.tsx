import React, { useEffect, useState } from 'react'
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Divider, Dropdown, Menu } from "antd"
import { useHistory, useParams } from "react-router-dom"
import { sendDeleteDetailRequest, sendGetDetailByDetailIdReqeust } from "../api/DetailApi"
import { Accommodation, Activity, DetailType, Transportation } from "../types/api/DetailType"
import ActivityDetailView from "../components/View/DetailView/ActivityDetailView"
import AccommodationDetailView from "../components/View/DetailView/AccommodationDetailView"
import TransportationDetailView from "../components/View/DetailView/TransportationDetailView"

const DetailPage = () => {
    const { planId, detailId, detailType } = useParams<{ planId: string, detailId: string, detailType: DetailType }>()
    const [title, setTitle] = useState("")
    const [detailComponent, setDetailComponent] = useState<JSX.Element | null>(null)
    const history = useHistory()

    const toUpdateDetailPage = () => {
        history.push(`/plan/${planId}/update-detail/${detailId}/${detailType}`)
    }

    const deleteDetail = async () => {
        if(window.confirm('정말 삭제하시겠습니까?')){
            const response = await sendDeleteDetailRequest(detailId)
            history.push(`/plan/${planId}`, { message: response.msg })
        }
    }

    const toPlanDetailPage = () => {
        history.push(`/plan/${planId}`)
    }

    useEffect(() => {
        sendGetDetailByDetailIdReqeust(detailId)
        .then(( response ) => {
            switch(detailType){
                case DetailType.ACTIVITY:
                    const activityDetail = response.detail as Activity
                    console.log('activity detail', activityDetail)
                    setTitle(activityDetail.activityName + "에서의 활동")
                    setDetailComponent(<ActivityDetailView detail={activityDetail} />)
                    return
                case DetailType.ACCOMMODATION:
                    const accommodationDetail = response.detail as Accommodation
                    console.log('activity detail', accommodationDetail)
                    setTitle(accommodationDetail.accommodationName + "에서 숙박")
                    setDetailComponent(<AccommodationDetailView detail={accommodationDetail} />)
                    return
                case DetailType.TRANSPORTATION:
                    const transportationDetail = response.detail as Transportation
                    console.log('activity detail', transportationDetail)
                    setTitle(transportationDetail.transportationType + "로 이동")
                    setDetailComponent(<TransportationDetailView detail={transportationDetail}/>)
                    return
                default: 
                    return
            }
        })
    }, [])

    return (
        <div className="max-w-xl mx-auto">
            <div>
                { detailComponent }
            </div>
            <Divider />
            <div className="w-3/4 mx-auto mb-3 flex justify-center">
                <button 
                    onClick={toUpdateDetailPage}
                    className="px-8 py-2 bg-primary text-white mr-5  text-semibold rounded-md text-center shadow-2xl"
                >수정</button>
                <button
                    onClick={deleteDetail}
                    className="px-8 py-2 bg-gray-300 text-white  mr-5 text-semibold rounded-md text-center shadow-2xl"
                >삭제</button>
                <button
                    onClick={toPlanDetailPage}
                    className="px-8 py-2 bg-gray-300 text-white text-semibold rounded-md text-center shadow-2xl"
                >
                뒤로
                </button>
            </div>
        </div>
    )
}

export default DetailPage
