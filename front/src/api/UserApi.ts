import { BasicResponse } from "../types/api/BasicApiType";
import { LoginRequest, LoginResponse, MeResponse, ResetPasswordRequest, SignUpReqeust } from "../types/api/UserType";
import { basicAxios } from "./axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const sendSignUpRequest = async (signUpRequest: SignUpReqeust) => {
    console.log("api:", signUpRequest.email, signUpRequest.name)
    const response = await basicAxios.post(`/user/signup`, null, {
        params: {
            email: signUpRequest.email,
            name: signUpRequest.name,
            password: signUpRequest.password,
            passwordConfirm: signUpRequest.passwordConfirm
        }
    });

    console.log('signup response: ', response);

    const { success, msg } : BasicResponse = response.data;

    return { success, msg };
}

export const sendLoginRequest = async (loginRequest: LoginRequest) => {
    const response = await basicAxios.post(`/user/signin`, null, {
        params: {
            email: loginRequest.email,
            password: loginRequest.password,
        }
    });

    console.log('login response: ', response);

    const { success, msg, token} : LoginResponse = response.data;

    cookies.set("X-AUTH-TOKEN", token)

    return { success, msg, token };
}

export const sendmeRequest = async () => {
    const token = cookies.get("X-AUTH-TOKEN")
    console.log('api token in cookie: ', token)

    const response = await basicAxios.get(`/user/me`, {
        headers: {
            "X-AUTH-TOKEN":  token
        }
    });

    console.log('me response: ', response);

    const { success, msg, email, name, userId } : MeResponse = response.data;

    return { success, msg, email, name, userId };
}

export const sendResetPasswordRequest = async ({ email, name }: ResetPasswordRequest) => {
    console.log('user api:', email, name)
    const response = await basicAxios.post(`/user/sendMailPassword`, null, {
        params: {
            email,
            name
        }
    });

    const { msg, success } = response.data;

    return { msg, success }
}