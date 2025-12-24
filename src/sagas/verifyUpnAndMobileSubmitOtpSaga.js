import { call, put, takeLatest } from 'redux-saga/effects'

import {
    VERIFY_UPN_AND_MOBILE_SUBMIT_OTP,
    verifyUpnAndMobileSubmitOtpSuccess,
    verifyUpnAndMobileSubmitOtpFail,
    verifyUpnAndMobileSubmitOtpAlert,
} from '../actions/verifyUpnAndMobileSubmitOtpAction'
import verifyUpnAndMobileSubmitOtpApi from '../apis/verifyUpnAndMobileSubmitOtpApi'


export function* verifyUpnAndMobileSubmitOtpSaga(action) {
    try {
        const response = yield call(() => verifyUpnAndMobileSubmitOtpApi(action.params))
        if (response.data.Status === 1) {
            yield put(verifyUpnAndMobileSubmitOtpAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(verifyUpnAndMobileSubmitOtpSuccess(response, action))
        } else {
            yield put(verifyUpnAndMobileSubmitOtpFail(response, action))
        }
    } catch (e) {
        yield put(verifyUpnAndMobileSubmitOtpFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(VERIFY_UPN_AND_MOBILE_SUBMIT_OTP, verifyUpnAndMobileSubmitOtpSaga);
}