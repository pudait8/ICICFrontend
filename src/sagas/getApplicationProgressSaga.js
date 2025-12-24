import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_APPLICATION_PROGRESS, getApplicationProgressSuccess, getApplicationProgressFail, getApplicationProgressAlert,
} from '../actions/getApplicationProgressAction'
import getApplicationProgressApi from '../apis/getApplicationProgressApi'


export function* getApplicationProgressSaga(action) {
    try {
        const response = yield call(() => getApplicationProgressApi(action.params))
        if (response.data.Status === 1) {
            yield put(getApplicationProgressAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getApplicationProgressSuccess(response, action))
        } else {
            yield put(getApplicationProgressFail(response, action))
        }
    } catch (e) {
        yield put(getApplicationProgressFail(e.message, action))
    }
}

export default function* ApplicationProgressSaga() {
    yield takeLatest(GET_APPLICATION_PROGRESS, getApplicationProgressSaga);
}