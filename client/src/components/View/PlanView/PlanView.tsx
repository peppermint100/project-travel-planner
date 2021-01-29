import { MoreOutlined } from '@ant-design/icons'
import { message } from 'antd';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { sendDeletePlanRequeset, sendDeleteSharedPlanRequest } from '../../../api/PlanApi';
import { _requestGetAllPlans } from '../../../redux/actions/GetAllPlansAction';
import { BasicResponse } from "../../../types/api/BasicApiType";
import { Plan } from '../../../types/api/PlanType'

interface Props {
    plan: Plan;
    openModal: (currentPlanId: number, currentPlanName: string) => void;
    sharedPlanId?: number
}

const PlanView: React.FC<Props> = ({ plan, openModal, sharedPlanId }) => {

    const [isButtonOverlayed, setIsButtonOverlayed] = useState(false);
    const dispatch = useDispatch()
    const history = useHistory()

    const deletePlan = async () => {
        let response: BasicResponse = {success: false, msg: ""}
        let confirmDelete = window.confirm('정말 삭제하시겠습니까?')
        if(confirmDelete && !sharedPlanId){
            response = await sendDeletePlanRequeset(plan.planId);
        }else if(confirmDelete && sharedPlanId){
            response = await sendDeleteSharedPlanRequest(sharedPlanId)
        }
        dispatch(_requestGetAllPlans(plan.userId));
        setIsButtonOverlayed(false);
        message.info(response.msg)
    }

    return (
        <div className="relative w-full h-44 mb-8 transform transition-transform hover:-translate-y-5">
            <div className="absolute w-full h-full bg-no-repeat rounded shadow-lg" 
                style={{
                    backgroundImage: `url(${plan.placeImage})`,
                    backgroundSize: 'cover',
                    filter: "brightness(45%)",
                    borderRadius: "6px",
                    backgroundPosition: "50% 50%",
                    zIndex: -100
                }}
            >
            </div>    
            {
                isButtonOverlayed ? (
                    <section className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        {
                            !sharedPlanId && 
                            <div className="w-full text-white font-semibold text-2xl text-center z-10">
                                <button onClick={() => { openModal(plan.planId, plan.planName) }} className="w-3/4 py-1 bg-gray-200 text-primary rounded-lg font-bold mb-5">공유하기</button>
                            </div>
                        }
                       <div className="w-full text-white font-semibold text-2xl text-center">
                            <button onClick={deletePlan} className="w-3/4 py-1 bg-gray-200 text-primary rounded-lg font-bold">삭제하기</button>
                        </div>
                    </section>
                ) : 
                <section className="w-3/4 mx-auto h-full z-10" onClick={() => {
                    history.push(`/plan/${plan.planId}`)
                }}>
                    <p className=
                        "text-white absolute top-1/2 left-1/2 font-semibold text-2xl text-center transform -translate-x-1/2 -translate-y-1/2"
                    >
                        { plan.planName }
                    </p>
                    {
                        sharedPlanId && 
                        <p
                            className="text-white absolute bottom-0 left-1/2 text-lg text-center transform -translate-x-1/2 p-4"
                        >
                            { plan.planOwner}님이 공유한 계획
                        </p>
                    }
                </section>
            }
                <section className="absolute top-2 right-1">
                    <button onClick={() => {
                        setIsButtonOverlayed(!isButtonOverlayed);
                    }}>
                        <MoreOutlined className="text-white text-3xl" />
                    </button>
                </section>
        </div>
    )
}

export default PlanView
