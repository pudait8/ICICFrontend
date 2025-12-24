import { call, put, takeLatest } from 'redux-saga/effects'

import {
    SAVE_LEGAL_HEIR_TRANSFER_APPLICATION, saveLegalHeirTransferApplicationSuccess, saveLegalHeirTransferApplicationFail, saveLegalHeirTransferApplicationAlert,
} from '../actions/transferApplicationSaveLegalHeirActions'
import transferApplicationSaveLegalHeirApi from '../apis/transferApplicationSaveLegalHeirApi'


export function* saveLegalHeirTransferApplicationSaga(action) {
    try {
        const response = yield call(() => transferApplicationSaveLegalHeirApi(action.params))
        if (response.data.Status === 1) {
            yield put(saveLegalHeirTransferApplicationAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(saveLegalHeirTransferApplicationSuccess(response, action))
        } else {
            yield put(saveLegalHeirTransferApplicationFail(response, action))
        }
    } catch (e) {
        yield put(saveLegalHeirTransferApplicationFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(SAVE_LEGAL_HEIR_TRANSFER_APPLICATION, saveLegalHeirTransferApplicationSaga);
}