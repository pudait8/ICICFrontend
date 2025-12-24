import { call, put, takeLatest } from 'redux-saga/effects'

import {
    CITIZEN_SIGNUP_VERIFY_OTP,
    citizenSignupVerifyOtpSuccess,
    citizenSignupVerifyOtpFail,
    citizenSignupVerifyOtpAlert,
} from '../actions/citizenSignupVerifyOtpAction'
import citizenSignupVerifyOtpApi from '../apis/citizenSignupVerifyOtpApi'


export function* citizenSignupVerifyOtpSaga(action) {
    try {
        const response = yield call(() => citizenSignupVerifyOtpApi(action.params))
        if (response.data.Status === 1) {
            yield put(citizenSignupVerifyOtpAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(citizenSignupVerifyOtpSuccess(response, action))
        } else {
            yield put(citizenSignupVerifyOtpFail(response, action))
        }
    } catch (e) {
        yield put(citizenSignupVerifyOtpFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(CITIZEN_SIGNUP_VERIFY_OTP, citizenSignupVerifyOtpSaga);
}