import { GetAllPlansResponseType } from '../../types/api/PlanType';
export const REQUEST_GET_ALL_PLANS = "REQUEST_GET_ALL_PLANS"
export const RECEIVE_GET_ALL_PLANS = "RECEIVE_GET_ALL_PLANS"

export const _requestGetAllPlans = (userId: number) => ({
    type: REQUEST_GET_ALL_PLANS,
    userId
})

export const _receiveGetAllPlans = (getAllPlansResponse: GetAllPlansResponseType) => ({
    type: RECEIVE_GET_ALL_PLANS,
    getAllPlansResponse
})

type receiveGetAllPlansType = ReturnType<typeof _receiveGetAllPlans>

export type GetAllPlansActionType = receiveGetAllPlansType