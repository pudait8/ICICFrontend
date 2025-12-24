import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_MY_DOCUMENTS_LIST, getMyDocumentsListSuccess, getMyDocumentsListFail, getMyDocumentsListAlert,
} from '../actions/getMyDocumentsListAction'
import getMyDocumentsListApi from '../apis/getMyDocumentsListApi'


export function* getMyDocumentsListSaga(action) {
    try {
        const response = yield call(() => getMyDocumentsListApi(action.params))
        if (response.data.Status === 1) {
            yield put(getMyDocumentsListAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getMyDocumentsListSuccess(response, action))
        } else {
            yield put(getMyDocumentsListFail(response, action))
        }
    } catch (e) {
        yield put(getMyDocumentsListFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_MY_DOCUMENTS_LIST, getMyDocumentsListSaga);
}