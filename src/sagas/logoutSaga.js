import { call, put, takeLatest } from 'redux-saga/effects'

import {
    LOGOUT,
    logoutSuccess,
    logoutFail,
    logoutAlert,
} from '../actions/logoutAction'
import logoutApi from '../apis/logoutApi'


export function* logoutSaga(action) {
    try {
        const response = yield call(() => logoutApi(action.params))
        if (response.data.Status === 1) {
            yield put(logoutAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(logoutSuccess(response, action))
        } else {
            yield put(logoutFail(response, action))
        }
    } catch (e) {
        yield put(logoutFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(LOGOUT, logoutSaga);
}