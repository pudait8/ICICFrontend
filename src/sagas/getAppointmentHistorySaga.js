import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_APPOINTMENT_HISTORY,
    getAppointmentHistorySuccess,
    getAppointmentHistoryFail,
    getAppointmentHistoryAlert,
} from '../actions/getAppointmentHistoryAction'
import getAppointmentHistoryApi from '../apis/getAppointmentHistoryApi'


export function* getAppointmentHistorySaga(action) {
    try {
        const response = yield call(() => getAppointmentHistoryApi(action.params))
        if (response.data.Status === 1) {
            yield put(getAppointmentHistoryAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getAppointmentHistorySuccess(response, action))
        } else {
            yield put(getAppointmentHistoryFail(response, action))
        }
    } catch (e) {
        yield put(getAppointmentHistoryFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_APPOINTMENT_HISTORY, getAppointmentHistorySaga);
}