import { MoreOutlined } from '@ant-design/icons'
import { message } from 'antd';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { sendDeletePlanRequeset } from '../../../api/PlanApi';
import { _requestGetAllPlans } from '../../../redux/actions/GetAllPlansAction';
import { Plan } from '../../../types/api/PlanType'

interface Props {
    plan: Plan;
    openModal: (currentPlanId: number, currentPlanName: string) => void;
}

const PlanView: React.FC<Props> = ({ plan, openModal }) => {

    const [isButtonOverlayed, setIsButtonOverlayed] = useState(false);
    const dispatch = useDispatch()

    const deletePlan = async () => {
        const response = await sendDeletePlanRequeset(plan.planId);
        console.log("delete plan response: ", response)
        setIsButtonOverlayed(false);

        let confirmDelete = window.confirm('정말 삭제하시겠습니까?')
        if(confirmDelete){
            dispatch(_requestGetAllPlans(plan.userId));
            message.info(response.msg)
        }
    }

    return (
        <div className="relative w-full h-44 mb-8">
            <div className="absolute w-full h-full bg-no-repeat rounded shadow-lg" 
                style={{
                    backgroundImage: `url(${plan.placeImage})`,
                    backgroundSize: 'cover',
                    filter: "brightness(45%)",
                    borderRadius: "6px",
                    backgroundPosition: "50% 50%"
                }}
            >
            </div>    
            {
                isButtonOverlayed ? (
                    <section className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-full text-white font-semibold text-2xl text-center">
                            <button onClick={() => { openModal(plan.planId, plan.planName) }} className="w-3/4 py-1 bg-gray-200 text-primary rounded-lg font-bold mb-5">공유하기</button>
                        </div>
                        <div className="w-full text-white font-semibold text-2xl text-center">
                            <button onClick={deletePlan} className="w-3/4 py-1 bg-gray-200 text-primary rounded-lg font-bold">삭제하기</button>
                        </div>
                    </section>
                ) : 
                <section>
                    <p className=
                        "text-white absolute top-1/2 left-1/2 font-semibold text-2xl text-center transform -translate-x-1/2 -translate-y-1/2"
                    >
                        { plan.planName }
                    </p>
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
