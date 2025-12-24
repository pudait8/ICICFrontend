import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_WEB_CONTENT,
    getWebContentSuccess,
    getWebContentFail,
    getWebContentAlert,
} from '../actions/getWebContentAction'
import getWebContentApi from '../apis/getWebContentApi'


export function* getWebContentSaga(action) {
    try {
        const response = yield call(() => getWebContentApi(action.params))
        if (response.data.Status === 1) {
            yield put(getWebContentAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getWebContentSuccess(response, action))
        } else {
            yield put(getWebContentFail(response, action))
        }
    } catch (e) {
        yield put(getWebContentFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_WEB_CONTENT, getWebContentSaga);
}
