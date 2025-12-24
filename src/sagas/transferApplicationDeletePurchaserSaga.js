import { call, put, takeLatest } from 'redux-saga/effects'

import {
    DELETE_PURCHASER_TRANSFER_APPLICATION, deletePurchaserTransferApplicationSuccess, deletePurchaserTransferApplicationFail, deletePurchaserTransferApplicationAlert,
} from '../actions/transferApplicationDeletePurchaserActions'

import transferApplicationDeletePurchaserApi from '../apis/transferApplicationDeletePurchaserApi'


export function* deletePurchaserTransferApplicationSaga(action) {
    try {
        const response = yield call(() => transferApplicationDeletePurchaserApi(action.params))
        if (response.data.Status === 1) {
            yield put(deletePurchaserTransferApplicationAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(deletePurchaserTransferApplicationSuccess(response, action))
        } else {
            yield put(deletePurchaserTransferApplicationFail(response, action))
        }
    } catch (e) {
        yield put(deletePurchaserTransferApplicationFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(DELETE_PURCHASER_TRANSFER_APPLICATION, deletePurchaserTransferApplicationSaga);
}