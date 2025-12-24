import { call, put, takeLatest } from 'redux-saga/effects'

import {
    SAVE_WORK_FLOW, saveWorkFlowSuccess, saveWorkFlowFail, saveWorkFlowAlert,
} from '../actions/saveWorkFlowAction'
import saveWorkFlowApi from '../apis/saveWorkFlowApi'


export function* saveWorkFlowSaga(action) {
    try {
        const response = yield call(() => saveWorkFlowApi(action.params))
        if (response.data.Status === 1) {
            yield put(saveWorkFlowAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(saveWorkFlowSuccess(response, action))
        } else {
            yield put(saveWorkFlowFail(response, action))
        }
    } catch (e) {
        yield put(saveWorkFlowFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(SAVE_WORK_FLOW, saveWorkFlowSaga);
}