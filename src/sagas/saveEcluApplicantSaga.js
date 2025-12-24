import { call, put, takeLatest } from 'redux-saga/effects'

import {
    SAVE_ECLU_APPLICANT,
    saveEcluApplicantSuccess,
    saveEcluApplicantFail,
    saveEcluApplicantAlert,
} from '../actions/saveEcluApplicantAction'
import saveEcluApplicantApi from '../apis/saveEcluApplicantApi'


export function* saveEcluApplicantSaga(action) {
    try {
        const response = yield call(() => saveEcluApplicantApi(action.params))
        if (response.data.Status === 1) {
            yield put(saveEcluApplicantAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(saveEcluApplicantSuccess(response, action))
        } else {
            yield put(saveEcluApplicantFail(response, action))
        }
    } catch (e) {
        yield put(saveEcluApplicantFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(SAVE_ECLU_APPLICANT, saveEcluApplicantSaga);
}