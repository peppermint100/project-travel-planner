import { ArrowLeftOutlined } from "@ant-design/icons"
import React, {  useEffect, useState } from 'react'
import { useHistory,  useParams } from "react-router-dom"
import { sendGetPlanByPlanId } from "../api/DetailApi"
import FloatingCircleButton from "../components/Button/FloatingCircleButton"
import DetailView from "../components/View/DetailView/DetailView"
import { Detail, GetPlanByPlanIdResponseType } from "../types/api/DetailType"
import { Plan } from "../types/api/PlanType"
import noDetailsIcon from "./../assets/no_details_icon.svg";

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

    const toHome = () => {
        history.push("/home")
    }

    useEffect(() => {
        console.log('params', params)
        sendGetPlanByPlanId(params.planId)
        .then((response: GetPlanByPlanIdResponseType) => {
            setPlanDetail({
                details: response.details,
                plan: response.plan,
                success: response.success
            })
        })
    }, [])

    return (
        <div className="max-w-xl mx-auto min-h-screen relative">
            <div className="w-full h-96 relative">
                <div className="w-full h-full object-cover absolute" style={{
                    filter: "brightness(50%)",
                    backgroundImage: `url(${planDetail.plan.placeImage})`
                }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="text-white font-semibold text-2xl leading-2">{ planDetail.plan.planName }</div>
                </div>
                <div className="absolute top-12 right-5 text-3xl text-white" onClick={toHome}>
                        <ArrowLeftOutlined />
                </div>
            </div>
            <section className="w-full flex justify-center items-center">
                {
                    planDetail.details && planDetail.details.length === 0 ?
                    <div className="mt-20" style={{minHeight: "20rem"}}>
                        <img className="mx-auto" src={noDetailsIcon} alt="no-detail-icon" />
                        <p className="text-xl mt-5" style={{color: "#C4C4C4"}}>계획이 텅~비어 있어요.</p>
                    </div>
                    : 
                    <ul className="w-full"> 
                        {
                            planDetail.details.map((detail) => {
                                return (
                                    <DetailView detail={detail}/>
                                )
                            })
                        }
                    </ul>
                }
            </section>
            <div className="absolute bottom-7 right-7">
                <FloatingCircleButton onClick={() => {
                    history.push(`/plan/${planDetail.plan.planId}/${planDetail.plan.planName}/new-detail`, {
                        planName: planDetail.plan.planName
                    })
                }} />
            </div>
        </div>
    )
}

export default PlanDetailPage
