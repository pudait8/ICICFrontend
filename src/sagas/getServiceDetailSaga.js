import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_SERVICE_DETAIL,
    getServiceDetailSuccess,
    getServiceDetailFail,
    getServiceDetailAlert,
} from '../actions/getServiceDetailAction'
import getServiceDetailApi from '../apis/getServiceDetailApi'


export function* getServiceDetailSaga(action) {
    try {
        const response = yield call(() => getServiceDetailApi(action.params))
        if (response.data.Status === 1) {
            yield put(getServiceDetailAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getServiceDetailSuccess(response, action))
        } else {
            yield put(getServiceDetailFail(response, action))
        }
    } catch (e) {
        yield put(getServiceDetailFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_SERVICE_DETAIL, getServiceDetailSaga);
}