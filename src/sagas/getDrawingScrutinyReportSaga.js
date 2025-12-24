import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_DRAWING_SCRUTINY_REPORT,
    getDrawingScrutinyReportSuccess,
    getDrawingScrutinyReportFail,
    getDrawingScrutinyReportAlert,
} from '../actions/getDrawingScrutinyReportAction'
import getDrawingScrutinyReportApi from '../apis/getDrawingScrutinyReportApi'


export function* getDrawingScrutinyReportSaga(action) {
    try {
        const response = yield call(() => getDrawingScrutinyReportApi(action.params))
        if (response.data.Status === 1) {
            yield put(getDrawingScrutinyReportAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getDrawingScrutinyReportSuccess(response, action))
        } else {
            yield put(getDrawingScrutinyReportFail(response, action))
        }
    } catch (e) {
        yield put(getDrawingScrutinyReportFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_DRAWING_SCRUTINY_REPORT, getDrawingScrutinyReportSaga);
}