import { call, put, takeLatest } from 'redux-saga/effects'

import {
    DELETE_GPA, deleteGpaSuccess, deleteGpaFail, deleteGpaAlert,
} from '../actions/deleteGpaActions'

import deleteGpaApi from '../apis/deleteGpaApi'


export function* deleteGpaSaga(action) {
    try {
        const response = yield call(() => deleteGpaApi(action.params))
        if (response.data.Status === 1) {
            yield put(deleteGpaAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(deleteGpaSuccess(response, action))
        } else {
            yield put(deleteGpaFail(response, action))
        }
    } catch (e) {
        yield put(deleteGpaFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(DELETE_GPA, deleteGpaSaga);
}