import { call, put, takeLatest } from 'redux-saga/effects'

import {
    FORGOT_PASSWORD_SEND_OTP,
    forgotPasswordSendOtpSuccess,
    forgotPasswordSendOtpFail,
    forgotPasswordSendOtpAlert,
} from '../actions/forgotPasswordSendOtpAction'
import forgotPasswordSendOtpApi from '../apis/forgotPasswordSendOtpApi'


export function* forgotPasswordSendOtpSaga(action) {
    try {
        const response = yield call(() => forgotPasswordSendOtpApi(action.params))
        if (response.data.Status === 1) {
            yield put(forgotPasswordSendOtpAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(forgotPasswordSendOtpSuccess(response, action))
        } else {
            yield put(forgotPasswordSendOtpFail(response, action))
        }
    } catch (e) {
        yield put(forgotPasswordSendOtpFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(FORGOT_PASSWORD_SEND_OTP, forgotPasswordSendOtpSaga);
}