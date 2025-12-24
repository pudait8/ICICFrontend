import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_WATER_PAYMENT_LINK,
    getWaterPaymentLinkSuccess,
    getWaterPaymentLinkFail,
    getWaterPaymentLinkAlert,
} from '../actions/getWaterPaymentLinkAction'
import getWaterPaymentLinkApi from '../apis/getWaterPaymentLinkApi'


export function* getWaterPaymentLinkSaga(action) {
    try {
        const response = yield call(() => getWaterPaymentLinkApi(action.params))
        if (response.data.Status === 1) {
            yield put(getWaterPaymentLinkAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getWaterPaymentLinkSuccess(response, action))
        } else {
            yield put(getWaterPaymentLinkFail(response, action))
        }
    } catch (e) {
        yield put(getWaterPaymentLinkFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_WATER_PAYMENT_LINK, getWaterPaymentLinkSaga);
}
