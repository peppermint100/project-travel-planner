import { call, put } from "redux-saga/effects";
import { sendCheckConnectionRequest } from "../../api/checkConnectionApi";
import { _receiveCheckConection } from "../actions/CheckConnectionAction";

function* checkConnectionSaga() {
    const success: boolean = yield call(sendCheckConnectionRequest);

    yield put(_receiveCheckConection({
        isLoading: false,
        success
    }));
}

export default checkConnectionSaga;