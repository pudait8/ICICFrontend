import { call, put, takeLatest } from 'redux-saga/effects'

import {
    FETCH_TRANSFER_APPLICATION, fetchTransferApplicationSuccess, fetchTransferApplicationFail, fetchTransferApplicationAlert,
} from '../actions/transferApplicationfetchActions'

import transferApplicationFetchApi from '../apis/transferApplicationFetchApi'


export function* fetchTransferApplicationSaga(action) {
    try {
        const response = yield call(() => transferApplicationFetchApi(action.params))
        if (response.data.Status === 1) {
            yield put(fetchTransferApplicationAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(fetchTransferApplicationSuccess(response, action))
        } else {
            yield put(fetchTransferApplicationFail(response, action))
        }
    } catch (e) {
        yield put(fetchTransferApplicationFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(FETCH_TRANSFER_APPLICATION, fetchTransferApplicationSaga);
}