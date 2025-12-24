import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_ARCHITECT_DASHBOARD,
    getArchitectDashboardSuccess,
    getArchitectDashboardFail,
    getArchitectDashboardAlert,
} from '../actions/getArchitectDashboardAction'
import getArchitectDashboardApi from '../apis/getArchitectDashboardApi'


export function* getArchitectDashboardSaga(action) {
    try {
        const response = yield call(() => getArchitectDashboardApi(action.params))
        if (response.data.Status === 1) {
            yield put(getArchitectDashboardAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getArchitectDashboardSuccess(response, action))
        } else {
            yield put(getArchitectDashboardFail(response, action))
        }
    } catch (e) {
        yield put(getArchitectDashboardFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_ARCHITECT_DASHBOARD, getArchitectDashboardSaga);
}