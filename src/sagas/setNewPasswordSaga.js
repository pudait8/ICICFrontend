import { call, put, takeLatest } from 'redux-saga/effects'

import {
    SET_NEW_PASSWORD,
    setNewPasswordSuccess,
    setNewPasswordFail,
    setNewPasswordAlert,
} from '../actions/setNewPasswordAction'
import setNewPasswordApi from '../apis/setNewPasswordApi'


export function* setNewPasswordSaga(action) {
    try {
        const response = yield call(() => setNewPasswordApi(action.params))
        if (response.data.Status === 1) {
            yield put(setNewPasswordAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(setNewPasswordSuccess(response, action))
        } else {
            yield put(setNewPasswordFail(response, action))
        }
    } catch (e) {
        yield put(setNewPasswordFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(SET_NEW_PASSWORD, setNewPasswordSaga);
}