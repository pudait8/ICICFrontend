import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_AUTHORITY_LIST,
    getAuthorityListSuccess,
    getAuthorityListFail,
    getAuthorityListAlert,
} from '../actions/getAuthorityListAction'
import getAuthorityListApi from '../apis/getAuthorityListApi'


export function* getAuthorityListSaga(action) {
    try {
        const response = yield call(() => getAuthorityListApi(action.params))
        if (response.data.Status === 1) {
            yield put(getAuthorityListAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getAuthorityListSuccess(response, action))
        } else {
            yield put(getAuthorityListFail(response, action))
        }
    } catch (e) {
        yield put(getAuthorityListFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_AUTHORITY_LIST, getAuthorityListSaga);
}