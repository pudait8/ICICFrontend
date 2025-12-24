import { call, put, takeLatest } from 'redux-saga/effects'

import {
    KNOW_YOUR_PROPERTY_VERIFY_UPN_AND_MOBILE,
    knowYourPropertyVerifyUpnAndMobileSuccess,
    knowYourPropertyVerifyUpnAndMobileFail,
    knowYourPropertyVerifyUpnAndMobileAlert,
} from '../actions/knowYourPropertyVerifyUpnAndMobileAction'
import verifyUpnAndMobileApi from '../apis/verifyUpnAndMobileApi'


export function* knowYourPropertyVerifyUpnAndMobileSaga(action) {
    try {
        const response = yield call(() => verifyUpnAndMobileApi(action.params))
        if (response.data.Status === 1) {
            yield put(knowYourPropertyVerifyUpnAndMobileAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(knowYourPropertyVerifyUpnAndMobileSuccess(response, action))
        } else {
            yield put(knowYourPropertyVerifyUpnAndMobileFail(response, action))
        }
    } catch (e) {
        yield put(knowYourPropertyVerifyUpnAndMobileFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(KNOW_YOUR_PROPERTY_VERIFY_UPN_AND_MOBILE, knowYourPropertyVerifyUpnAndMobileSaga);
}