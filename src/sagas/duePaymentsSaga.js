import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_PROPERTY_DUE_PAYMENTS, getPropertyDuePaymentsSuccess, getPropertyDuePaymentsFail, getPropertyDuePaymentsAlert,
    GET_PAYMENT_INTEGRATION_PAYLOAD, getPaymentIntegrationPayloadSuccess, getPaymentIntegrationPayloadFail, getPaymentIntegrationPayloadAlert,
    PAYMENT_INTEGRATION_STATUS_CHECK, paymentIntegrationStatusCheckSuccess, paymentIntegrationStatusCheckFail, paymentIntegrationStatusCheckAlert,
} from '../actions/duePaymentsAction'
import getPropertyDuePaymentsApi from '../apis/getPropertyDuePaymentsApi'
import getPaymentIntegrationPayloadApi from '../apis/getPaymentIntegrationPayloadApi'
import paymentIntegrationStatusCheckApi from '../apis/paymentIntegrationStatusCheckApi'


export function* getPropertyDuePaymentsSaga(action) {
    try {
        const response = yield call(() => getPropertyDuePaymentsApi(action.params))
        if (response.data.Status === 1) {
            yield put(getPropertyDuePaymentsAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getPropertyDuePaymentsSuccess(response, action))
        } else {
            yield put(getPropertyDuePaymentsFail(response, action))
        }
    } catch (e) {
        yield put(getPropertyDuePaymentsFail(e.message, action))
    }
}

export function* getPaymentIntegrationPayloadSaga(action) {
    try {
        const response = yield call(() => getPaymentIntegrationPayloadApi(action.params))
        if (response.data.Status === 1) {
            yield put(getPaymentIntegrationPayloadAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getPaymentIntegrationPayloadSuccess(response, action))
        } else {
            yield put(getPaymentIntegrationPayloadFail(response, action))
        }
    } catch (e) {
        yield put(getPaymentIntegrationPayloadFail(e.message, action))
    }
}

export function* paymentIntegrationStatusCheckSaga(action) {
    try {
        const response = yield call(() => paymentIntegrationStatusCheckApi(action.params))
        if (response.data.Status === 1) {
            yield put(paymentIntegrationStatusCheckAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(paymentIntegrationStatusCheckSuccess(response, action))
        } else {
            yield put(paymentIntegrationStatusCheckFail(response, action))
        }
    } catch (e) {
        yield put(paymentIntegrationStatusCheckFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_PROPERTY_DUE_PAYMENTS, getPropertyDuePaymentsSaga);
    yield takeLatest(GET_PAYMENT_INTEGRATION_PAYLOAD, getPaymentIntegrationPayloadSaga);
    yield takeLatest(PAYMENT_INTEGRATION_STATUS_CHECK, paymentIntegrationStatusCheckSaga);
}