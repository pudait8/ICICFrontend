import { call, put, takeLatest } from 'redux-saga/effects'

import {
    POST_AUTO_DCR,
    postAutoDCRSuccess,
    postAutoDCRFail,
    postAutoDCRAlert,
} from '../actions/postAutoDCRAction'
import postAutoDCRApi from '../apis/postAutoDCRApi'


export function* postAutoDCRSaga(action) {
    try {
        const response = yield call(() => postAutoDCRApi(action.params))
        if (response.data.Status === 1) {
            yield put(postAutoDCRAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(postAutoDCRSuccess(response, action))
        } else {
            yield put(postAutoDCRFail(response, action))
        }
    } catch (e) {
        yield put(postAutoDCRFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(POST_AUTO_DCR, postAutoDCRSaga);
}