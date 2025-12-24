import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_WATER_RECEIPT,
    getWaterReceiptSuccess,
    getWaterReceiptFail,
    getWaterReceiptAlert,
} from '../actions/getWaterReceiptAction'
import getWaterReceiptApi from '../apis/getWaterReceiptApi'


export function* getWaterReceiptSaga(action) {
    try {
        const response = yield call(() => getWaterReceiptApi(action.params))
        if (response.data.Status === 1) {
            yield put(getWaterReceiptAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getWaterReceiptSuccess(response, action))
        } else {
            yield put(getWaterReceiptFail(response, action))
        }
    } catch (e) {
        yield put(getWaterReceiptFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_WATER_RECEIPT, getWaterReceiptSaga);
}
