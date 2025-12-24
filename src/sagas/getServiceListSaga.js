import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_SERVICE_LIST,
    getServiceListSuccess,
    getServiceListFail,
    getServiceListAlert,
} from '../actions/getServiceListAction'
import getServiceListApi from '../apis/getServiceListApi'


export function* getServiceListSaga(action) {
    try {
        const response = yield call(() => getServiceListApi(action.params))
        if (response.data.Status === 1) {
            yield put(getServiceListAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getServiceListSuccess(response, action))
        } else {
            yield put(getServiceListFail(response, action))
        }
    } catch (e) {
        yield put(getServiceListFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_SERVICE_LIST, getServiceListSaga);
}