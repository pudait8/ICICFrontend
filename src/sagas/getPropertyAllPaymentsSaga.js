import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_PROPERTY_ALL_PAYMENTS, getPropertyAllPaymentsSuccess, getPropertyAllPaymentsFail, getPropertyAllPaymentsAlert,
} from '../actions/getPropertyAllPaymentsAction'
import getPropertyAllPaymentsApi from '../apis/getPropertyAllPaymentsApi'


export function* getPropertyAllPaymentsSaga(action) {
    try {
        const response = yield call(() => getPropertyAllPaymentsApi(action.params))
        if (response.data.Status === 1) {
            yield put(getPropertyAllPaymentsAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getPropertyAllPaymentsSuccess(response, action))
        } else {
            yield put(getPropertyAllPaymentsFail(response, action))
        }
    } catch (e) {
        yield put(getPropertyAllPaymentsFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_PROPERTY_ALL_PAYMENTS, getPropertyAllPaymentsSaga);
}