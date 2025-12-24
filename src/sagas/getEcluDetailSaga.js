import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_ECLU_DETAIL, getEcluDetailSuccess, getEcluDetailFail, getEcluDetailAlert,
} from '../actions/getEcluDetailAction'
import getEcluDetailApi from '../apis/getEcluDetailApi'


export function* getEcluDetailSaga(action) {
    try {
        const response = yield call(() => getEcluDetailApi(action.params))
        if (response.data.Status === 1) {
            yield put(getEcluDetailAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getEcluDetailSuccess(response, action))
        } else {
            yield put(getEcluDetailFail(response, action))
        }
    } catch (e) {
        yield put(getEcluDetailFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_ECLU_DETAIL, getEcluDetailSaga);
}