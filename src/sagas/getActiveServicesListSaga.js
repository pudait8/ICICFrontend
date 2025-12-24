import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_ACTIVE_SERVICES_LIST,
    getActiveServicesListSuccess,
    getActiveServicesListFail,
    getActiveServicesListAlert,
} from '../actions/getActiveServicesListAction'
import getActiveServicesListApi from '../apis/getActiveServicesListApi'


export function* getActiveServicesListSaga(action) {
    try {
        const response = yield call(() => getActiveServicesListApi(action.params))
        if (response.data.Status === 1) {
            yield put(getActiveServicesListAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getActiveServicesListSuccess(response, action))
        } else {
            yield put(getActiveServicesListFail(response, action))
        }
    } catch (e) {
        yield put(getActiveServicesListFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_ACTIVE_SERVICES_LIST, getActiveServicesListSaga);
}