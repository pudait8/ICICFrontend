import { call, put, takeLatest } from 'redux-saga/effects'

import {
    RESCHEDULE_APPOINTMENT_BY_CITIZEN, rescheduleAppointmentByCitizenSuccess, rescheduleAppointmentByCitizenFail, rescheduleAppointmentByCitizenAlert,
} from '../actions/rescheduleAppointmentByCitizenAction'
import rescheduleAppointmentByCitizenApi from '../apis/rescheduleAppointmentByCitizenApi'


export function* rescheduleAppointmentByCitizenSaga(action) {
    try {
        const response = yield call(() => rescheduleAppointmentByCitizenApi(action.params))
        if (response.data.Status === 1) {
            yield put(rescheduleAppointmentByCitizenAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(rescheduleAppointmentByCitizenSuccess(response, action))
        } else {
            yield put(rescheduleAppointmentByCitizenFail(response, action))
        }
    } catch (e) {
        yield put(rescheduleAppointmentByCitizenFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(RESCHEDULE_APPOINTMENT_BY_CITIZEN, rescheduleAppointmentByCitizenSaga);
}