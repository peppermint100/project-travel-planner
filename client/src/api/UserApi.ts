import { BasicResponse } from "../types/api/BasicApiType";
import { LoginRequest, LoginResponse, MeResponse, ResetPasswordRequest, SignUpReqeust, UpdateUserInfoRequest } from "../types/api/UserType";
import { basicAxios } from "./axios";
import Cookies from "universal-cookie"

const cookies = new Cookies();

export const sendSignUpRequest = async (signUpRequest: SignUpReqeust) => {
    const response = await basicAxios.post(`/user/signup`, null, {
        params: {
            email: signUpRequest.email,
            name: signUpRequest.name,
            password: signUpRequest.password,
            passwordConfirm: signUpRequest.passwordConfirm
        }
    });

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

    const { success, msg, token} : LoginResponse = response.data;

    cookies.set("X-AUTH-TOKEN", token)
    
    return { success, msg, token };
}

export const sendmeRequest = async () => {
    const token = cookies.get("X-AUTH-TOKEN")

    const response = await basicAxios.get(`/user/me`, {
        headers: {
            "X-AUTH-TOKEN":  token
        }
    });

    const { success, msg, email, name, userId, userImage } : MeResponse = response.data;

    return { success, msg, email, name, userId, userImage };
}

export const sendResetPasswordRequest = async (resetPasswordRequest: ResetPasswordRequest) => {
    const { email, name } = resetPasswordRequest;
    const response = await basicAxios.post(`/user/sendMailPassword`, null, {
        params: {
            email,
            name
        }
    });

    const { msg, success } = response.data;

    return { msg, success }
}

export const sendUpdateUserInfoRequest = async (updateUserInfoRequest: UpdateUserInfoRequest) => {

    const { userId, name, passwordBefore, password, passwordConfirm, formData } = updateUserInfoRequest;
    
    const response = await basicAxios.put(`/user/updateUserInfo/${userId}`, formData, {
        params : {
            userId,
            name,
            passwordBefore,
            password,
            passwordConfirm
        }
    })

    const resToReturn: BasicResponse = response.data;

    return resToReturn;
}