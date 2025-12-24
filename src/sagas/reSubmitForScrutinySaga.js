import { call, put, takeLatest } from 'redux-saga/effects'

import {
    RE_SUBMIT_FOR_SCRUTINY,
    reSubmitForScrutinySuccess,
    reSubmitForScrutinyFail,
    reSubmitForScrutinyAlert,
} from '../actions/reSubmitForScrutinyAction'
import reSubmitForScrutinyApi from '../apis/reSubmitForScrutinyApi'


export function* reSubmitForScrutinySaga(action) {
    try {
        const response = yield call(() => reSubmitForScrutinyApi(action.params))
        if (response.data.Status === 1) {
            yield put(reSubmitForScrutinyAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(reSubmitForScrutinySuccess(response, action))
        } else {
            yield put(reSubmitForScrutinyFail(response, action))
        }
    } catch (e) {
        yield put(reSubmitForScrutinyFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(RE_SUBMIT_FOR_SCRUTINY, reSubmitForScrutinySaga);
}