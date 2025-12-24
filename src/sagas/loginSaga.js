import { call, put, takeLatest } from 'redux-saga/effects'

import {
    LOGIN,
    loginSuccess,
    loginFail,
    loginAlert,
} from '../actions/loginAction'
import loginApi from '../apis/loginApi'


export function* loginSaga(action) {
    try {
        const response = yield call(() => loginApi(action.params))
        if (response.data.Status === 1) {
            yield put(loginAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(loginSuccess(response, action))
        } else {
            yield put(loginFail(response, action))
        }
    } catch (e) {
        yield put(loginFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(LOGIN, loginSaga);
}