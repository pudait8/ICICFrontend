import { call, put, takeLatest } from 'redux-saga/effects'
import {
    GET_APPLICATIONTOTAL_TOTAL_STATUS,
    getApplicationTotalStatusSuccess,
    getApplicationTotalStatusFail,
    getApplicationTotalStatusAlert,
} from '../actions/getApplicationTotalStatusAction'
import getApplicationTotalStatusApi from '../apis/getApplicationTotalStatusApi'


export function* getApplicationTotalStatusSaga(action) {
    try {
        const response = yield call(() => getApplicationTotalStatusApi(action.params))
        if (response.data.Status === 1) {
            yield put(getApplicationTotalStatusAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getApplicationTotalStatusSuccess(response, action))
        } else {
            yield put(getApplicationTotalStatusFail(response, action))
        }
    } catch (e) {
        yield put(getApplicationTotalStatusFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_APPLICATIONTOTAL_TOTAL_STATUS, getApplicationTotalStatusSaga);
}