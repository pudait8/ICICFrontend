import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_APPOINTMENT_DATE,
    getAppointmentDateSuccess,
    getAppointmentDateFail,
    getAppointmentDateAlert,
} from '../actions/getAppointmentDateAction'
import getAppointmentDateApi from '../apis/getAppointmentDateApi'


export function* getAppointmentDateSaga(action) {
    try {
        const response = yield call(() => getAppointmentDateApi(action.params))
        if (response.data.Status === 1) {
            yield put(getAppointmentDateAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getAppointmentDateSuccess(response, action))
        } else {
            yield put(getAppointmentDateFail(response, action))
        }
    } catch (e) {
        yield put(getAppointmentDateFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_APPOINTMENT_DATE, getAppointmentDateSaga);
}