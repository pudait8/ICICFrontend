import { call, put, takeLatest } from 'redux-saga/effects'

import {
    SAVE_TRANSFER_APPLICATION, saveTransferApplicationSuccess, saveTransferApplicationFail, saveTransferApplicationAlert,
} from '../actions/transferApplicationSaveActions'
import transferApplicationSaveApi from '../apis/transferApplicationSaveApi'


export function* saveTransferApplicationSaga(action) {
    try {
        const response = yield call(() => transferApplicationSaveApi(action.params))
        if (response.data.Status === 1) {
            yield put(saveTransferApplicationAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(saveTransferApplicationSuccess(response, action))
        } else {
            yield put(saveTransferApplicationFail(response, action))
        }
    } catch (e) {
        yield put(saveTransferApplicationFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(SAVE_TRANSFER_APPLICATION, saveTransferApplicationSaga);
}