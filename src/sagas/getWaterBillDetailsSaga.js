import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_WATER_BILL_DETAILS,
    getWaterBillDetailsSuccess,
    getWaterBillDetailsFail,
    getWaterBillDetailsAlert,
} from '../actions/getWaterBillDetailsAction'
import getWaterBillDetailsApi from '../apis/getWaterBillDetailsApi'


export function* getWaterBillDetailsSaga(action) {
    try {
        const response = yield call(() => getWaterBillDetailsApi(action.params))
        if (response.data.Status === 1) {
            yield put(getWaterBillDetailsAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getWaterBillDetailsSuccess(response, action))
        } else {
            yield put(getWaterBillDetailsFail(response, action))
        }
    } catch (e) {
        yield put(getWaterBillDetailsFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_WATER_BILL_DETAILS, getWaterBillDetailsSaga);
}
