export type SignUpReqeust = {
    email: string;
    name: string;
    password: string;
    passwordConfirm: string;
}

export type LoginRequest = {
    email: string;
    password: string;
}

export type SignUpResponse = {
    msg: string;
    isLoading: boolean;
    success: boolean;
}

export type LoginResponse = {
    msg: string;
    success: boolean;
    token: string;
}

export type MeResponse = {
    msg: string;
    success: boolean;
    email: string;
    userId: number;
    name: string;
    userImage: string;
}

export type ResetPasswordRequest = {
    email: string;
    name: string;
}

export type UpdateUserInfoRequest = {
    userId: number;
    name: string;
    passwordBefore: string;
    password: string;
    passwordConfirm: string;
    formData: FormData;
}