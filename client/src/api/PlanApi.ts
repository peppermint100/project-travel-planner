import { BasicResponse } from './../types/api/BasicApiType';
import { GetAllPlansResponseType, CreatePlanResponseType, SharePlanResponseType } from './../types/api/PlanType';
import { basicAxios } from "./axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const sendCreatePlanRequest = async (formData: FormData) => {
    const response = await basicAxios.post("/plan/createPlan", formData)

    const resToReturn: CreatePlanResponseType = response.data;
    
    return resToReturn;
} 

export const sendGetAllPlansRequest = async (userId: number) => {
    const token = cookies.get("X-AUTH-TOKEN");

    const response = await basicAxios.get(`/plan/getPlans/${userId?.toString()}`, {
        headers: {
            "X-AUTH-TOKEN": token
        }
    })

    const resToReturn: GetAllPlansResponseType = response.data;

    return resToReturn;
}

export const sendDeletePlanRequeset = async (planId: number) => {
    const token = cookies.get("X-AUTH-TOKEN");

    const response = await basicAxios.delete(`/plan/deletePlan/${planId.toString()}`, {
        headers: {
            "X-AUTH-TOKEN": token
        }
    })

    const resToReturn: BasicResponse = response.data;
    return resToReturn;
}

export const sendSharePlanRequest = async (userId: number, planId: number, email: string) => {
    const response = await basicAxios.post("/plan/sharePlan", {userId, planId, email});

    const resToReturn: SharePlanResponseType = response.data;

    return resToReturn;
}

export const sendDeleteSharedPlanRequest = async (sharedPlanId: number) => {
    const token = cookies.get("X-AUTH-TOKEN");

    const response = await basicAxios.delete(`/plan/deleteSharedPlan/${sharedPlanId.toString()}`, {
        headers: {
            "X-AUTH-TOKEN": token
        }
    })

    const resToReturn: BasicResponse = response.data;

    return resToReturn
}