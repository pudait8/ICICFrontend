import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_DRAFT_APPLICATION_DETAILS, getDraftApplicationDetailsSuccess, getDraftApplicationDetailsFail, getDraftApplicationDetailsAlert,
} from '../actions/getDraftApplicationDetailsAction'
import getDraftApplicationDetailsApi from '../apis/getDraftApplicationDetailsApi'

export function* getDraftApplicationDetailsSaga(action) {
    try {
        const response = yield call(() => getDraftApplicationDetailsApi(action.params))
        console.log("API RAW RESPONSE", response); 
        if (response.data.Status === 1) {
            yield put(getDraftApplicationDetailsAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getDraftApplicationDetailsSuccess(response, action))
        } else {
            yield put(getDraftApplicationDetailsFail(response, action))
        }
    } catch (e) {
        yield put(getDraftApplicationDetailsFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_DRAFT_APPLICATION_DETAILS, getDraftApplicationDetailsSaga);
}




