import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_APPL_LIST_BY_MOBILE_NO,
    getApplListByMobileNoSuccess,
    getApplListByMobileNoFail,
    getApplListByMobileNoAlert,
} from '../actions/getApplListByMobileNoAction'
import getApplListByMobileNoApi from '../apis/getApplListByMobileNoApi'


export function* getApplListByMobileNoSaga(action) {
    try {
        const response = yield call(() => getApplListByMobileNoApi(action.params))
        if (response.data.Status === 1) {
            yield put(getApplListByMobileNoAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getApplListByMobileNoSuccess(response, action))
        } else {
            yield put(getApplListByMobileNoFail(response, action))
        }
    } catch (e) {
        yield put(getApplListByMobileNoFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_APPL_LIST_BY_MOBILE_NO, getApplListByMobileNoSaga);
}