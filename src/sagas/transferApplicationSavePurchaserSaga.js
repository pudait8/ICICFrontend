import { call, put, takeLatest } from 'redux-saga/effects'

import {
    SAVE_PURCHASER_TRANSFER_APPLICATION, savePurchaserTransferApplicationSuccess, savePurchaserTransferApplicationFail, savePurchaserTransferApplicationAlert,
} from '../actions/transferApplicationSavePurchaserActions'

import transferApplicationSavePurchaserApi from '../apis/transferApplicationSavePurchaserApi'


export function* savePurchaserTransferApplicationSaga(action) {
    try {
        const response = yield call(() => transferApplicationSavePurchaserApi(action.params))
        if (response.data.Status === 1) {
            yield put(savePurchaserTransferApplicationAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(savePurchaserTransferApplicationSuccess(response, action))
        } else {
            yield put(savePurchaserTransferApplicationFail(response, action))
        }
    } catch (e) {
        yield put(savePurchaserTransferApplicationFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(SAVE_PURCHASER_TRANSFER_APPLICATION, savePurchaserTransferApplicationSaga);
}