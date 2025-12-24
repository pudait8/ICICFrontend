import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_PROPERTY_LEDGER,
    getPropertyLedgerSuccess,
    getPropertyLedgerFail,
    getPropertyLedgerAlert,
} from '../actions/getPropertyLedgerAction'
import getPropertyLedgerApi from '../apis/getPropertyLedgerApi'


export function* getPropertyLedgerSaga(action) {
    try {
        const response = yield call(() => getPropertyLedgerApi(action.params))
        if (response.data.Status === 1) {
            yield put(getPropertyLedgerAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getPropertyLedgerSuccess(response, action))
        } else {
            yield put(getPropertyLedgerFail(response, action))
        }
    } catch (e) {
        yield put(getPropertyLedgerFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_PROPERTY_LEDGER, getPropertyLedgerSaga);
}