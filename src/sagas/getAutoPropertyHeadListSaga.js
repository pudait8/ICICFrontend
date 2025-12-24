import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_AUTO_PROPERTY_HEAD_LIST,
    getAutoPropertyHeadListSuccess,
    getAutoPropertyHeadListFail,
    getAutoPropertyHeadListAlert,
} from '../actions/getAutoPropertyHeadListAction'
import getAutoPropertyHeadListApi from '../apis/getAutoPropertyHeadListApi'


export function* getAutoPropertyHeadListSaga(action) {
    try {
        const response = yield call(() => getAutoPropertyHeadListApi(action.params))
        if (response.data.Status === 1) {
            yield put(getAutoPropertyHeadListAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getAutoPropertyHeadListSuccess(response, action))
        } else {
            yield put(getAutoPropertyHeadListFail(response, action))
        }
    } catch (e) {
        yield put(getAutoPropertyHeadListFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_AUTO_PROPERTY_HEAD_LIST, getAutoPropertyHeadListSaga);
}