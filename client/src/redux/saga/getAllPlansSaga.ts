import { GetAllPlansResponseType } from './../../types/api/PlanType';
import { sendGetAllPlansRequest } from './../../api/PlanApi';
import { call, put } from "redux-saga/effects";
import { _receiveGetAllPlans } from '../actions/GetAllPlansAction';


function* getAllPlansSaga({ userId }: { userId: number }){
    const response: GetAllPlansResponseType = yield call(sendGetAllPlansRequest, userId)


    yield put(_receiveGetAllPlans(response))
}

export default getAllPlansSaga;