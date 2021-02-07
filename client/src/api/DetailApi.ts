import { Position } from './../types/map/MapType';
import { TransportationType } from './../types/detail/Transportation';
import { TOKEN_HEADER } from './../utils/constants';
import { BasicResponse } from './../types/api/BasicApiType';
import { GetPlanByPlanIdResponseType, CreateActivityRequest, CreateAccommodationRequest, CreateTransportationRequest, DetailType } from './../types/api/DetailType';
import { basicAxios } from "./axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();


export type getDetailByDetailIdResponse = {
    detailId: number,
    date: string,
    needs: Array<string>,
    comment: string,
    planId: number,
    detailType: DetailType,
    transportationType: TransportationType,
    locationStart: Position,
    locationArrive: Position,
    timeStart: string,
    timeEnd: string
}

export const sendGetDetailByDetailIdReqeust = async (detailId: string) => {
    const token = cookies.get(TOKEN_HEADER)
    const response = await basicAxios.get(`/detail/getDetail/${detailId}`, {
        headers: {
            TOKEN_HEADER: token
        }
    })

    const resToReturn: getDetailByDetailIdResponse = response.data
    console.log('get detail by detailid api response : ', resToReturn)

    return resToReturn
}

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

export const sendCreateAccommodationRequest = async (createAccommodationRequest: CreateAccommodationRequest) => {
    const response = await basicAxios.post("/detail/createAccommodation", createAccommodationRequest)
    console.log('create accomodation request :', createAccommodationRequest)

    const resToReturn: BasicResponse = response.data

    console.log("create accomodation result: ", resToReturn)

    return resToReturn
}

export const sendCreateTransportationRequest = async (createTransportationRequest: CreateTransportationRequest) => {
    const response = await basicAxios.post("/detail/createTransportation", createTransportationRequest)

    const resToReturn: BasicResponse = response.data

    console.log("create transportation result: ", resToReturn)

    return resToReturn
}

export const sendDeleteDetailRequest = async (detailId: string) => {
    const token = cookies.get(TOKEN_HEADER)
    const response = await basicAxios.delete(`/detail/deleteDetail/${detailId}`, {
        headers: {
            TOKEN_HEADER: token 
        }
    })

    const resToReturn: BasicResponse = response.data

    return resToReturn
}

export const sendUpdateTransportationRequest = async (detailId: string, updateTransportationRequest: CreateTransportationRequest) => {
    const response = await basicAxios.put(`/detail/updateTransportation/${detailId}`, updateTransportationRequest)

    const resToReturn: BasicResponse = response.data
    console.log(resToReturn)

    return resToReturn
}

export const sendUpdateActivityRequest = async (detailId: string, updateActivityRequest: CreateActivityRequest) => {
    const response = await basicAxios.put(`/detail/updateActivity/${detailId}`, updateActivityRequest)

    const resToReturn: BasicResponse = response.data

    console.log(resToReturn)
    return resToReturn
}

export const sendUpdateAccomodationRequest = async (detailId: string, updateAccommodationReqeust: CreateAccommodationRequest) => {
    const response = await basicAxios.put(`/detail/updateAccommodation/${detailId}`, updateAccommodationReqeust)

    const resToReturn: BasicResponse = response.data

    console.log(resToReturn)
    return resToReturn
}