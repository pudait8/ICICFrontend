import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_FAQ_LIST, getFaqListSuccess, getFaqListFail, getFaqListAlert,
} from '../actions/getFaqListAction'
import getFaqListApi from '../apis/getFaqListApi'


export function* getFaqListSaga(action) {
    try {
        const response = yield call(() => getFaqListApi(action.params))
        if (response.data.Status === 1) {
            yield put(getFaqListAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getFaqListSuccess(response, action))
        } else {
            yield put(getFaqListFail(response, action))
        }
    } catch (e) {
        yield put(getFaqListFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_FAQ_LIST, getFaqListSaga)
}