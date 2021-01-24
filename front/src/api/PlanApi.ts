import { basicAxios } from "./axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const sendCreatePlanRequest = async (formData: FormData) => {
    const response = await basicAxios.post("/plan/createPlan", formData)
    console.log("send request response ", response)
} 

export default sendCreatePlanRequest;