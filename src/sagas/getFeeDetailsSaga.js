import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_FEE_DETAILS, getFeeDetailsSuccess, getFeeDetailsFail, getFeeDetailsAlert,
} from '../actions/getFeeDetailsAction'
import getFeeDetailsApi from '../apis/getFeeDetailsApi'


export function* getFeeDetailsSaga(action) {
    try {
        const response = yield call(() => getFeeDetailsApi(action.params))
        if (response.data.Status === 1) {
            yield put(getFeeDetailsAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getFeeDetailsSuccess(response, action))
        } else {
            yield put(getFeeDetailsFail(response, action))
        }
    } catch (e) {
        yield put(getFeeDetailsFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_FEE_DETAILS, getFeeDetailsSaga)
}