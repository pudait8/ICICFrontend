import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GTE_NDC_DETAILS,
    gteNdcDetailsSuccess,
    gteNdcDetailsFail,
    gteNdcDetailsAlert,
} from '../actions/gteNdcDetailsAction'
import gteNdcDetailsApi from '../apis/gteNdcDetailsApi'


export function* gteNdcDetailsSaga(action) {
    try {
        const response = yield call(() => gteNdcDetailsApi(action.params))
        if (response.data.Status === 1) {
            yield put(gteNdcDetailsAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(gteNdcDetailsSuccess(response, action))
        } else {
            yield put(gteNdcDetailsFail(response, action))
        }
    } catch (e) {
        yield put(gteNdcDetailsFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GTE_NDC_DETAILS, gteNdcDetailsSaga);
}
