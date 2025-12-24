import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GTE_NDC_DETAILS,
    getNdcDetailsSuccess,
    getNdcDetailsFail,
    getNdcDetailsAlert,
} from '../actions/getNdcDetailsAction'
import getNdcDetailsApi from '../apis/getNdcDetailsApi'


export function* getNdcDetailsSaga(action) {
    try {
        const response = yield call(() => getNdcDetailsApi(action.params))
        if (response.data.Status === 1) {
            yield put(getNdcDetailsAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getNdcDetailsSuccess(response, action))
        } else {
            yield put(getNdcDetailsFail(response, action))
        }
    } catch (e) {
        yield put(getNdcDetailsFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GTE_NDC_DETAILS, getNdcDetailsSaga);
}
