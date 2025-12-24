import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_DOCUMENT_LIST,
    getDocumentListSuccess,
    getDocumentListFail,
    getDocumentListAlert,
} from '../actions/getDocumentListAction'
import getDocumentListApi from '../apis/getDocumentListApi'


export function* getDocumentListSaga(action) {
    try {
        const response = yield call(() => getDocumentListApi(action.params))
        if (response.data.Status === 1) {
            yield put(getDocumentListAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getDocumentListSuccess(response, action))
        } else {
            yield put(getDocumentListFail(response, action))
        }
    } catch (e) {
        yield put(getDocumentListFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_DOCUMENT_LIST, getDocumentListSaga);
}