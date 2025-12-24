import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_OWNER_LIST,
    getOwnerListSuccess,
    getOwnerListFail,
    getOwnerListAlert,
} from '../actions/getOwnerListAction'
import getOwnerListApi from '../apis/getOwnerListApi'


export function* getOwnerListSaga(action) {
    try {
        const response = yield call(() => getOwnerListApi(action.params))
        if (response.data.Status === 1) {
            yield put(getOwnerListAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getOwnerListSuccess(response, action))
        } else {
            yield put(getOwnerListFail(response, action))
        }
    } catch (e) {
        yield put(getOwnerListFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_OWNER_LIST, getOwnerListSaga);
}