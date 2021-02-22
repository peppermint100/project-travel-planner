import { basicAxios } from "./axios"
import { _receiveCheckConection } from "../redux/actions/CheckConnectionAction";

export const sendCheckConnectionRequest = async () => {
    let response = await basicAxios.get('/user/check-connection');

    const success = response.data.success;

    return success;
}