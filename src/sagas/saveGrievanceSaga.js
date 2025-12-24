import { call, put, takeLatest } from 'redux-saga/effects'

import {
    SAVE_GRIEVANCE,
    saveGrievanceSuccess,
    saveGrievanceFail,
    saveGrievanceAlert,
} from '../actions/saveGrievanceAction'
import saveGrievanceApi from '../apis/saveGrievanceApi'


export function* saveGrievanceSaga(action) {
    try {
        const response = yield call(() => saveGrievanceApi(action.params))
        if (response.data.Status === 1) {
            yield put(saveGrievanceAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(saveGrievanceSuccess(response, action))
        } else {
            yield put(saveGrievanceFail(response, action))
        }
    } catch (e) {
        yield put(saveGrievanceFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(SAVE_GRIEVANCE, saveGrievanceSaga);
}