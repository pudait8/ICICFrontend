import { call, put, takeLatest } from 'redux-saga/effects'

import {
    SAVE_GPA,
    saveGpaSuccess,
    saveGpaFail,
    saveGpaAlert,
} from '../actions/saveGpaAction'
import saveGpaApi from '../apis/saveGpaApi'


export function* saveGpaSaga(action) {
    try {
        const response = yield call(() => saveGpaApi(action.params))
        if (response.data.Status === 1) {
            yield put(saveGpaAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(saveGpaSuccess(response, action))
        } else {
            yield put(saveGpaFail(response, action))
        }
    } catch (e) {
        yield put(saveGpaFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(SAVE_GPA, saveGpaSaga);
}