import { call, put, takeLatest } from 'redux-saga/effects'

import {
    CITIZEN_SIGNUP_RESEND_OTP,
    citizenSignupResendOtpSuccess,
    citizenSignupResendOtpFail,
    citizenSignupResendOtpAlert,
} from '../actions/citizenSignupResendOtpAction'
import citizenSignupResendOtpApi from '../apis/citizenSignupResendOtpApi'


export function* citizenSignupResendOtpSaga(action) {
    try {
        const response = yield call(() => citizenSignupResendOtpApi(action.params))
        if (response.data.Status === 1) {
            yield put(citizenSignupResendOtpAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(citizenSignupResendOtpSuccess(response, action))
        } else {
            yield put(citizenSignupResendOtpFail(response, action))
        }
    } catch (e) {
        yield put(citizenSignupResendOtpFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(CITIZEN_SIGNUP_RESEND_OTP, citizenSignupResendOtpSaga);
}