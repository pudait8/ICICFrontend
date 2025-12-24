import { call, put, takeLatest } from 'redux-saga/effects'

import {
    SAVE_EDIT_APPLICATION,
    saveEditApplicationSuccess,
    saveEditApplicationFail,
    saveEditApplicationAlert,
} from '../actions/saveEditApplicationAction'
import saveEditApplicationApi from '../apis/saveEditApplicationApi'


export function* saveEditApplicationSaga(action) {
    try {
        const response = yield call(() => saveEditApplicationApi(action.params))
        if (response.data.Status === 1) {
            yield put(saveEditApplicationAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(saveEditApplicationSuccess(response, action))
        } else {
            yield put(saveEditApplicationFail(response, action))
        }
    } catch (e) {
        yield put(saveEditApplicationFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(SAVE_EDIT_APPLICATION, saveEditApplicationSaga);
}