import { basicAxios } from "./axios"
import env from "./../configs/env";
import { put } from "redux-saga/effects";
import { RECEIVE_CHECK_CONNECTION, _receiveCheckConection } from "../redux/actions/CheckConnectionAction";

export const sendCheckConnectionRequest = async () => {
    let response = await basicAxios.get('/user/check-connection');

    const success = response.data.success;

    return success;
}