import { call, put, takeLatest } from 'redux-saga/effects'

import {
    SAVE_APPLICATION, saveApplicationSuccess, saveApplicationFail, saveApplicationAlert,
} from '../actions/ApplyForServiceAction'
import saveApplicationApi from '../apis/saveApplicationApi'



export function* saveApplicationSaga(action) {
    try {
        const response = yield call(() => saveApplicationApi(action.params))
        if (response.data.Status === 1) {
            yield put(saveApplicationAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(saveApplicationSuccess(response, action))
        } else {
            yield put(saveApplicationFail(response, action))
        }
    } catch (e) {
        yield put(saveApplicationFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(SAVE_APPLICATION, saveApplicationSaga);
}