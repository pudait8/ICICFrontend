import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_MASTER_PLAN_LIST, getMasterPlanListSuccess, getMasterPlanListFail, getMasterPlanListAlert,
} from '../actions/getMasterPlanListAction'
import getMasterPlanListApi from '../apis/getMasterPlanListApi'


export function* getMasterPlanListSaga(action) {
    try {
        const response = yield call(() => getMasterPlanListApi(action.params))
        if (response.data.Status === 1) {
            yield put(getMasterPlanListAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getMasterPlanListSuccess(response, action))
        } else {
            yield put(getMasterPlanListFail(response, action))
        }
    } catch (e) {
        yield put(getMasterPlanListFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_MASTER_PLAN_LIST, getMasterPlanListSaga)
}