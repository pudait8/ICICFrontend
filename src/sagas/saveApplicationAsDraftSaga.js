import { call, put, takeLatest } from 'redux-saga/effects'

import {
    SAVE_APPLICATION_AS_DRAFT, saveApplicationAsDraftSuccess, saveApplicationAsDraftFail, saveApplicationAsDraftAlert,
} from '../actions/saveApplicationAsDraftAction'
import saveApplicationAsDraftApi from '../apis/saveApplicationAsDraftApi'


export function* saveApplicationAsDraftSaga(action) {
    try {
        const response = yield call(() => saveApplicationAsDraftApi(action.params))
        if (response.data.Status === 1) {
            yield put(saveApplicationAsDraftAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(saveApplicationAsDraftSuccess(response, action))
        } else {
            yield put(saveApplicationAsDraftFail(response, action))
        }
    } catch (e) {
        yield put(saveApplicationAsDraftFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(SAVE_APPLICATION_AS_DRAFT, saveApplicationAsDraftSaga);
}







