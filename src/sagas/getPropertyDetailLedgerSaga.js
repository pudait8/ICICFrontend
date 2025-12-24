import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_PROPERTY_DETAIL_LEDGER,
    getPropertyDetailLedgerSuccess,
    getPropertyDetailLedgerFail,
    getPropertyDetailLedgerAlert,
} from '../actions/getPropertyDetailLedgerAction'
import getPropertyDetailLedgerApi from '../apis/getPropertyDetailLedgerApi'


export function* getPropertyDetailLedgerSaga(action) {
    try {
        const response = yield call(() => getPropertyDetailLedgerApi(action.params))
        if (response.data.Status === 1) {
            yield put(getPropertyDetailLedgerAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getPropertyDetailLedgerSuccess(response, action))
        } else {
            yield put(getPropertyDetailLedgerFail(response, action))
        }
    } catch (e) {
        yield put(getPropertyDetailLedgerFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_PROPERTY_DETAIL_LEDGER, getPropertyDetailLedgerSaga);
}