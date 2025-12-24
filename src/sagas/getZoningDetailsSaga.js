import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_ZONING_DETAILS,
    getZoningDetailSuccess,
    getZoningDetailAlert,
    getZoningDetailFail,
} from '../actions/getZoningDetailsAction'
import getZoningDetailApi from '../apis/getZoningDetailApi'


export function* getZoningDetailsSaga(action) {
    try {
        const response = yield call(() => getZoningDetailApi(action.params))
        if (response.data.Status === 1) {
            yield put(getZoningDetailAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getZoningDetailSuccess(response, action))
        } else {
            yield put(getZoningDetailFail(response, action))
        }
    } catch (e) {
        yield put(getZoningDetailFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_ZONING_DETAILS, getZoningDetailsSaga);
}
