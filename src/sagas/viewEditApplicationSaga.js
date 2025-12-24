import { call, put, takeLatest } from 'redux-saga/effects'

import {
    VIEW_EDIT_APPLICATION,
    viewEditApplicationSuccess,
    viewEditApplicationFail,
    viewEditApplicationAlert,
} from '../actions/viewEditApplicationAction'
import viewEditApplicationApi from '../apis/viewEditApplicationApi'


export function* viewEditApplicationSaga(action) {
    try {
        const response = yield call(() => viewEditApplicationApi(action.params))
        if (response.data.Status === 1) {
            yield put(viewEditApplicationAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(viewEditApplicationSuccess(response, action))
        } else {
            yield put(viewEditApplicationFail(response, action))
        }
    } catch (e) {
        yield put(viewEditApplicationFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(VIEW_EDIT_APPLICATION, viewEditApplicationSaga);
}
