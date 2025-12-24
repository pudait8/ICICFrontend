import { call, put, takeLatest } from 'redux-saga/effects'

import {
    DELETE_LEGAL_HEIR_TRANSFER_APPLICATION, deleteLegalHeirTransferApplicationSuccess, deleteLegalHeirTransferApplicationFail, deleteLegalHeirTransferApplicationAlert,
} from '../actions/transferApplicationDeleteLegalHeirActions'
import transferApplicationDeleteLegalHeirApi from '../apis/transferApplicationDeleteLegalHeirApi'


export function* deleteLegalHeirTransferApplicationSaga(action) {
    try {
        const response = yield call(() => transferApplicationDeleteLegalHeirApi(action.params))
        if (response.data.Status === 1) {
            yield put(deleteLegalHeirTransferApplicationAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(deleteLegalHeirTransferApplicationSuccess(response, action))
        } else {
            yield put(deleteLegalHeirTransferApplicationFail(response, action))
        }
    } catch (e) {
        yield put(deleteLegalHeirTransferApplicationFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(DELETE_LEGAL_HEIR_TRANSFER_APPLICATION, deleteLegalHeirTransferApplicationSaga);
}