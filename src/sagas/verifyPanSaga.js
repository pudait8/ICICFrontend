import { call, put, takeLatest } from 'redux-saga/effects'

import {
    VERIFY_PAN,
    verifyPanSuccess,
    verifyPanFail,
    verifyPanAlert,
} from '../actions/verifyPanAction'
import verifyPanApi from '../apis/verifyPanApi'


export function* verifyPanSaga(action) {
    try {
        const response = yield call(() => verifyPanApi(action.params))
        if (response.data.Status === 1) {
            yield put(verifyPanAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(verifyPanSuccess(response, action))
        } else {
            yield put(verifyPanFail(response, action))
        }
    } catch (e) {
        yield put(verifyPanFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(VERIFY_PAN, verifyPanSaga);
}