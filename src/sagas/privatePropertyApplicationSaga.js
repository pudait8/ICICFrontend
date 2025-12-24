import { call, put, takeLatest } from 'redux-saga/effects'

import {
    PRIVATE_PROPERTY_APPLICATION, privatePropertyApplicationSuccess, privatePropertyApplicationFail, privatePropertyApplicationAlert,
} from '../actions/privatePropertyApplicationAction'
import privatePropertyApplicationApi from '../apis/privatePropertyApplicationApi'


export function* privatePropertyApplicationSaga(action) {
    try {
        const response = yield call(() => privatePropertyApplicationApi(action.params))
        if (response.data.Status === 1) {
            yield put(privatePropertyApplicationAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(privatePropertyApplicationSuccess(response, action))
        } else {
            yield put(privatePropertyApplicationFail(response, action))
        }
    } catch (e) {
        yield put(privatePropertyApplicationFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(PRIVATE_PROPERTY_APPLICATION, privatePropertyApplicationSaga);
}