import React, { useState }  from 'react'
import { useSelector } from 'react-redux';
import { RootReducerType } from '../../../redux/reducers/rootReducer';
import { Plan, SharePlanResponseType } from '../../../types/api/PlanType';
import CreatePlanForm from '../../Form/CreatePlanForm';
import PlanView from '../PlanView/PlanView';
import { Modal, Button } from 'antd';
import DefaultButton from '../../Button/DefaultButton';
import MainLogo from '../../Image/MainLogo';
import DefaultInput from '../../Input/DefaultInput';
import { sendSharePlanRequest } from "../../../api/PlanApi";

interface Props {
  userId: number
}


const SharedPlanView: React.FC<Props> = ({ userId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentSelectedPlanId, setCurrentSelectedPlanId] = useState(0);
  const [currentSelectedPlanName, setCurrentSelectedPlanName] = useState("");
  const [modalEmailInput, setModalEmailInput] = useState("");
  const [sharePlanResponse, setSharePlanResponse] = useState<SharePlanResponseType>({
    success: false,
    msg: "",
    sharePlanId: 0
  })

  const showModal = (planId: number, planName: string) => {
    setCurrentSelectedPlanId(planId);
    setCurrentSelectedPlanName(planName);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSharePlan = async (userId: number, planId: number, email: string) => {
    const response = await sendSharePlanRequest(userId, planId, email);
    console.log('share plan response', response)
    setSharePlanResponse(response)
  }

  const getAllPlansResponse = useSelector((state: RootReducerType) => state.GetAllPlansReducer)

  return (
    <div>
        <section className="flex flex-col items-center bg-white w-3/4 mx-auto shadow-lg rounded p-10 mt-8">
        </section>
        <Modal 
          visible={isModalVisible} 
          onOk={handleOk} 
          onCancel={handleCancel}
          footer={[
            <DefaultButton text="공유하기" onClick={() => {
              console.log('current plan id: ', currentSelectedPlanId)
              handleSharePlan(userId, currentSelectedPlanId, modalEmailInput)
            }}/>
          ]}
          >
        <div className="w-3/4 mx-auto flex flex-col items-center">
          <section>
            <MainLogo withPrimary={true} />
          </section>
          <section className="mt-8">
            <header className="text-2xl font-semibold text-primary">플랜 공유</header>
          </section>
          <section className="w-full">
            <DefaultInput placeholder="example@example.com" name="shared-plan-target-email" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setModalEmailInput(e.target.value);
            }} value={modalEmailInput}/>
          </section>
          <section className="mt-8">
            <p className="text-primary">
              회원님이 입력하신 이메일로 <span className="font-bold">{currentSelectedPlanName}</span>이(가) 공유됩니다.
            </p>
          </section>
          <section className="mt-8">
            {
              sharePlanResponse.success ? 
              <p className="text-primary">
                {sharePlanResponse.msg}
              </p>
              : <p className="text-red-400">
                {sharePlanResponse.msg}
              </p>
            }
          </section>
        </div>
      </Modal>
        <section className="flex flex-col items-center w-3/4 mx-auto mt-8">
          {
            getAllPlansResponse.success ? 
            <ul className="w-full">
              {
                getAllPlansResponse.plans.map((plan: Plan) => (
                  <li key={plan.planId} className="w-full">
                    <PlanView plan={plan} openModal={showModal} />
                  </li>
                ))
              }
            </ul>
            : null
          }
        </section>
    </div>
  )
}


export default SharedPlanView

