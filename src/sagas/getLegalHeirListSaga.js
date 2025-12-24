import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_LEGAL_HEIR_LIST,
    getLegalHeirListSuccess,
    getLegalHeirListFail,
    getLegalHeirListAlert,
} from '../actions/getLegalHeirListAction'
import getLegalHeirListApi from '../apis/getLegalHeirListApi'


export function* getLegalHeirListSaga(action) {
    try {
        const response = yield call(() => getLegalHeirListApi(action.params))
        if (response.data.Status === 1) {
            yield put(getLegalHeirListAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getLegalHeirListSuccess(response, action))
        } else {
            yield put(getLegalHeirListFail(response, action))
        }
    } catch (e) {
        yield put(getLegalHeirListFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_LEGAL_HEIR_LIST, getLegalHeirListSaga);
}