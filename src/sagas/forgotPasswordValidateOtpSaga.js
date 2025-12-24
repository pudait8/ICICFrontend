import { call, put, takeLatest } from 'redux-saga/effects'

import {
    FORGOT_PASSWORD_VALIDATE_OTP,
    forgotPasswordValidateOtpSuccess,
    forgotPasswordValidateOtpFail,
    forgotPasswordValidateOtpAlert,
} from '../actions/forgotPasswordValidateOtpAction'
import forgotPasswordValidateOtpApi from '../apis/forgotPasswordValidateOtpApi'


export function* forgotPasswordValidateOtpSaga(action) {
    try {
        const response = yield call(() => forgotPasswordValidateOtpApi(action.params))
        if (response.data.Status === 1) {
            yield put(forgotPasswordValidateOtpAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(forgotPasswordValidateOtpSuccess(response, action))
        } else {
            yield put(forgotPasswordValidateOtpFail(response, action))
        }
    } catch (e) {
        yield put(forgotPasswordValidateOtpFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(FORGOT_PASSWORD_VALIDATE_OTP, forgotPasswordValidateOtpSaga);
}