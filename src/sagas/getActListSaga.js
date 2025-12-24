import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_ACT_LIST, getActListSuccess, getActListFail, getActListAlert,
} from '../actions/getActListAction'
import getActListApi from '../apis/getActListApi'


export function* getActListSaga(action) {
    try {
        const response = yield call(() => getActListApi(action.params))
        if (response.data.Status === 1) {
            yield put(getActListAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getActListSuccess(response, action))
        } else {
            yield put(getActListFail(response, action))
        }
    } catch (e) {
        yield put(getActListFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_ACT_LIST, getActListSaga)
}