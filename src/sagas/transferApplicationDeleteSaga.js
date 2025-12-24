import { call, put, takeLatest } from 'redux-saga/effects'

import {
    DELETE_TRANSFER_APPLICATION, deleteTransferApplicationSuccess, deleteTransferApplicationFail, deleteTransferApplicationAlert,
} from '../actions/transferApplicationDeleteActions'
import transferApplicationDeleteApi from '../apis/transferApplicationDeleteApi'


export function* deleteTransferApplicationSaga(action) {
    try {
        const response = yield call(() => transferApplicationDeleteApi(action.params))
        if (response.data.Status === 1) {
            yield put(deleteTransferApplicationAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(deleteTransferApplicationSuccess(response, action))
        } else {
            yield put(deleteTransferApplicationFail(response, action))
        }
    } catch (e) {
        yield put(deleteTransferApplicationFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(DELETE_TRANSFER_APPLICATION, deleteTransferApplicationSaga);
}