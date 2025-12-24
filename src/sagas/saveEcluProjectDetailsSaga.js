import { call, put, takeLatest } from 'redux-saga/effects'

import {
    SAVE_ECLU_PROJECT_DETAILS,
    saveEcluProjectDetailsSuccess,
    saveEcluProjectDetailsFail,
    saveEcluProjectDetailsAlert,
} from '../actions/saveEcluProjectDetailsAction'
import saveEcluProjectDetailsApi from '../apis/saveEcluProjectDetailsApi'


export function* saveEcluProjectDetailsSaga(action) {
    try {
        const response = yield call(() => saveEcluProjectDetailsApi(action.params))
        if (response.data.Status === 1) {
            yield put(saveEcluProjectDetailsAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(saveEcluProjectDetailsSuccess(response, action))
        } else {
            yield put(saveEcluProjectDetailsFail(response, action))
        }
    } catch (e) {
        yield put(saveEcluProjectDetailsFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(SAVE_ECLU_PROJECT_DETAILS, saveEcluProjectDetailsSaga);
}