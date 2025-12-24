import { call, put, takeLatest } from 'redux-saga/effects'

import {
    SAVE_NDC_APPLICATION,
    saveNdcApplicationSuccess,
    saveNdcApplicationFail,
    saveNdcApplicationAlert,
} from '../actions/saveNdcApplicationAction'
import saveNdcApplicationApi from '../apis/saveNdcApplicationApi'


export function* saveNdcApplicationSaga(action) {
    try {
        const response = yield call(() => saveNdcApplicationApi(action.params))
        if (response.data.Status === 1) {
            yield put(saveNdcApplicationAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(saveNdcApplicationSuccess(response, action))
        } else {
            yield put(saveNdcApplicationFail(response, action))
        }
    } catch (e) {
        yield put(saveNdcApplicationFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(SAVE_NDC_APPLICATION, saveNdcApplicationSaga);
}