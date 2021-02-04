import { BasicResponse } from './../types/api/BasicApiType';
import { GetPlanByPlanIdResponseType, CreateActivityRequest, CreateAccomodationRequest, CreateTransportationRequest } from './../types/api/DetailType';
import { basicAxios } from "./axios";
import Cookies from "universal-cookie";
import { TOKEN_HEADER } from "../utils/constants";

const cookies = new Cookies();

export const sendGetPlanByPlanId = async (planId: string) => {
    const token = cookies.get(TOKEN_HEADER)
    const response = await basicAxios.get(`/detail/getPlanDetail/${planId}`, {
        headers: {
            TOKEN_HEADER: token 
        }
    })

    const resToReturn: GetPlanByPlanIdResponseType = response.data;

    console.log('send get all detail request response: ', resToReturn);

    return resToReturn;
}


export const sendCreateActivityRequest = async (createActivityRequest: CreateActivityRequest) => {
    const response = await basicAxios.post("/detail/createActivity", createActivityRequest)

    const resToReturn: BasicResponse = response.data
    
    console.log("create activity result: ", resToReturn)

    return resToReturn
}

export const sendCreateAccomodationRequest = async (createAccomodationRequest: CreateAccomodationRequest) => {
    const response = await basicAxios.post("/detail/createAccommodation", createAccomodationRequest)

    const resToReturn: BasicResponse = response.data

    console.log("create accomodation result: ", resToReturn)

    return resToReturn
}

export const sendCreateTransportationRequest = async (createTransportationRequest: CreateTransportationRequest) => {
    const response = await basicAxios.post("/detail/createTranspotation", createTransportationRequest)

    const resToReturn: BasicResponse = response.data

    console.log("create transportation result: ", resToReturn)

    return resToReturn
}