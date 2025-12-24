import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_STATE_LIST,
    getStateListSuccess,
    getStateListFail,
    getStateListAlert,
} from '../actions/getStateListAction'
import getStateListApi from '../apis/getStateListApi'


export function* getStateListSaga(action) {
    try {
        const response = yield call(() => getStateListApi(action.params))
        if (response.data.Status === 1) {
            yield put(getStateListAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getStateListSuccess(response, action))
        } else {
            yield put(getStateListFail(response, action))
        }
    } catch (e) {
        yield put(getStateListFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_STATE_LIST, getStateListSaga);
}