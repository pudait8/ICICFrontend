import { call, put, takeLatest } from 'redux-saga/effects'

import {
    VERIFY_PAN_SUBMIT_OTP,
    verifyPanSubmitOtpSuccess,
    verifyPanSubmitOtpFail,
    verifyPanSubmitOtpAlert,
} from '../actions/verifyPanSubmitOtpAction'
import verifyPanSubmitOtpApi from '../apis/verifyPanSubmitOtpApi'


export function* verifyPanSubmitOtpSaga(action) {
    try {
        const response = yield call(() => verifyPanSubmitOtpApi(action.params))
        if (response.data.Status === 1) {
            yield put(verifyPanSubmitOtpAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(verifyPanSubmitOtpSuccess(response, action))
        } else {
            yield put(verifyPanSubmitOtpFail(response, action))
        }
    } catch (e) {
        yield put(verifyPanSubmitOtpFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(VERIFY_PAN_SUBMIT_OTP, verifyPanSubmitOtpSaga);
}