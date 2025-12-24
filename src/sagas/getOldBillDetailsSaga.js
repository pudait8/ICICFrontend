import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_OLD_BILL_DETAILS,
    getOldBillDetailsSuccess,
    getOldBillDetailsFail,
    getOldBillDetailsAlert,
} from '../actions/getOldBillDetailsAction'
import getOldBillDetailsApi from '../apis/getOldBillDetailsApi'


export function* getOldBillDetailsSaga(action) {
    try {
        const response = yield call(() => getOldBillDetailsApi(action.params))
        if (response.data.Status === 1) {
            yield put(getOldBillDetailsAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getOldBillDetailsSuccess(response, action))
        } else {
            yield put(getOldBillDetailsFail(response, action))
        }
    } catch (e) {
        yield put(getOldBillDetailsFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_OLD_BILL_DETAILS, getOldBillDetailsSaga);
}