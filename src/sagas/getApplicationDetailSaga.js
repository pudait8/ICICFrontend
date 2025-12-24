import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_APPLICATION_DETAIL, getApplicationDetailSuccess, getApplicationDetailFail, getApplicationDetailAlert,
} from '../actions/getApplicationDetailAction'
import getApplicationDetailApi from '../apis/getApplicationDetailApi'


export function* getApplicationDetailSaga(action) {
    try {
        const response = yield call(() => getApplicationDetailApi(action.params))
        if (response.data.Status === 1) {
            yield put(getApplicationDetailAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getApplicationDetailSuccess(response, action))
        } else {
            yield put(getApplicationDetailFail(response, action))
        }
    } catch (e) {
        yield put(getApplicationDetailFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_APPLICATION_DETAIL, getApplicationDetailSaga);
}