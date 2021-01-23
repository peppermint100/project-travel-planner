import { basicAxios } from "./axios";

const sendCreatePlanRequest = async (formData: FormData) => {
    const response = await basicAxios.post("/plan/createPlan", formData)
    console.log("send request response ", response)
} 

export default sendCreatePlanRequest;