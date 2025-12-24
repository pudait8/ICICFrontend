import { call, put, takeLatest } from 'redux-saga/effects'

import {
    VERIFY_UPN_AND_MOBILE,
    verifyUpnAndMobileSuccess,
    verifyUpnAndMobileFail,
    verifyUpnAndMobileAlert,
} from '../actions/verifyUpnAndMobileAction'
import verifyUpnAndMobileApi from '../apis/verifyUpnAndMobileApi'


export function* verifyUpnAndMobileSaga(action) {
    try {
        const response = yield call(() => verifyUpnAndMobileApi(action.params))
        if (response.data.Status === 1) {
            yield put(verifyUpnAndMobileAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(verifyUpnAndMobileSuccess(response, action))
        } else {
            yield put(verifyUpnAndMobileFail(response, action))
        }
    } catch (e) {
        yield put(verifyUpnAndMobileFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(VERIFY_UPN_AND_MOBILE, verifyUpnAndMobileSaga);
}