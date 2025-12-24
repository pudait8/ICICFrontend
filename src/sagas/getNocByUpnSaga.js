import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_NOC_BY_UPN, getNocByUpnSuccess, getNocByUpnFail, getNocByUpnAlert,
} from '../actions/getNocByUpnAction'
import getNocByUpnApi from '../apis/getNocByUpnApi'


export function* getNocByUpnSaga(action) {
    try {
        const response = yield call(() => getNocByUpnApi(action.params))
        if (response.data.Status === 1) {
            yield put(getNocByUpnAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getNocByUpnSuccess(response, action))
        } else {
            yield put(getNocByUpnFail(response, action))
        }
    } catch (e) {
        yield put(getNocByUpnFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_NOC_BY_UPN, getNocByUpnSaga)
}