import { call, put, takeLatest } from 'redux-saga/effects'

import {
    TO_GET_PRIVATE_SCHEME, toGetPrivateSchemeSuccess, toGetPrivateSchemeFail, toGetPrivateSchemeAlert,
} from '../actions/toGetPrivateSchemeAction'
import toGetPrivateSchemeApi from '../apis/toGetPrivateSchemeApi'


export function* toGetPrivateSchemeSaga(action) {
    try {
        const response = yield call(() => toGetPrivateSchemeApi(action.params))
        if (response.data.Status === 1) {
            yield put(toGetPrivateSchemeAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(toGetPrivateSchemeSuccess(response, action))
        } else {
            yield put(toGetPrivateSchemeFail(response, action))
        }
    } catch (e) {
        yield put(toGetPrivateSchemeFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(TO_GET_PRIVATE_SCHEME, toGetPrivateSchemeSaga);
}