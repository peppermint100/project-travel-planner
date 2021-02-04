import { ArrowLeftOutlined } from "@ant-design/icons"
import React, {  useEffect, useState } from 'react'
import { useHistory,  useParams } from "react-router-dom"
import { sendGetPlanByPlanId } from "../api/DetailApi"
import FloatingCircleButton from "../components/Button/FloatingCircleButton"
import { Detail, GetPlanByPlanIdResponseType } from "../types/api/DetailType"
import { Plan } from "../types/api/PlanType"
import noDetailsIcon from "./../assets/no_details_icon.svg";

// const [startPosition, setStartPosition] = useState<MapStateType>({
//         address: "",
//         place: "",
//         zoom: 15,
//         height: 400,
//         mapPosition: { lat: 34, lng: 34 },
//         markerPosition: { lat: 34, lng: 34 },
//     });

//     const [endPosition, setEndPosition] = useState<MapStateType>({
//         address: "",
//         place: "",
//         zoom: 15,
//         height: 400,
//         mapPosition: { lat: 36, lng: 36 },
//         markerPosition: { lat: 36, lng: 36 },
//     });


type DetailPagePlanType = {
    details: Array<Detail>,
    success: boolean,
    plan: Partial<Plan>
}

const PlanDetailPage = () => {
    const params = useParams<{planId: string}>()
    const [planDetail, setPlanDetail] = useState<DetailPagePlanType>({
        details: [],
        plan: {},
        success: false
    })
    const history = useHistory()

    useEffect(() => {
        console.log('params', params)
        sendGetPlanByPlanId(params.planId)
        .then((response: GetPlanByPlanIdResponseType) => {
            console.log("get plan details response:", response)
            setPlanDetail({
                details: response.details,
                plan: response.plan,
                success: response.success
            })
        })
    }, [])

    return (
        <div className="w-full h-full bg-backgroundGray min-h-screen">
            <nav className="flex justify-between h-16">
                <div className="text-3xl text-primary h-full flex items-center" onClick={() => {
                    history.push("/home")
                }}>
                    <ArrowLeftOutlined className="p-3" />
                </div>
                <div className="h-full flex items-center">
                    <span className="text-lg font-semibold transform -translate-x-6">{ planDetail.plan?.planName }</span>
                </div>
                <div></div>
            </nav>
            <section className="w-full mt-5">
                <img className="w-full h-52 object-bottom object-cover overflow-hidden" src={planDetail.plan?.placeImage} alt="place-image" />
            </section>
            <section className="w-full flex justify-center items-center" style={{ minHeight: "20rem"}}>
                {
                    planDetail.details && planDetail.details.length === 0 ?
                    <div>
                        <img className="mx-auto" src={noDetailsIcon} alt="no-detail-icon" />
                        <p className="text-xl mt-5" style={{color: "#C4C4C4"}}>계획이 텅~비어 있어요.</p>
                    </div>
                    : <div> details exist</div>
                }
            </section>
            <FloatingCircleButton onClick={() => {
                history.push(`/plan/${planDetail.plan.planId}/${planDetail.plan.planName}/new-detail`, {
                    planName: planDetail.plan.planName
                })
            }} />
        </div>
    )
}

export default PlanDetailPage
