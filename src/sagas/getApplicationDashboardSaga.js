import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_APPLICATION_DASHBOARD,
    getApplicationDashboardSuccess,
    getApplicationDashboardFail,
    getApplicationDashboardAlert,
} from '../actions/getApplicationDashboardAction'
import getApplicationDashboardApi from '../apis/getApplicationDashboardApi'


export function* getApplicationDashboardSaga(action) {
    try {
        const response = yield call(() => getApplicationDashboardApi(action.params))
        if (response.data.Status === 1) {
            yield put(getApplicationDashboardAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getApplicationDashboardSuccess(response, action))
        } else {
            yield put(getApplicationDashboardFail(response, action))
        }
    } catch (e) {
        yield put(getApplicationDashboardFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_APPLICATION_DASHBOARD, getApplicationDashboardSaga);
}