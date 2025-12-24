import { call, put, takeLatest } from 'redux-saga/effects'

import {
    SAVE_ECLU_BUSSINESS_DETAILS,
    saveEcluBussinessDetailsSuccess,
    saveEcluBussinessDetailsFail,
    saveEcluBussinessDetailsAlert,
} from '../actions/saveEcluBussinessDetailsAction'
import saveEcluBussinessDetailsApi from '../apis/saveEcluBussinessDetailsApi'


export function* saveEcluBussinessDetailsSaga(action) {
    try {
        const response = yield call(() => saveEcluBussinessDetailsApi(action.params))
        if (response.data.Status === 1) {
            yield put(saveEcluBussinessDetailsAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(saveEcluBussinessDetailsSuccess(response, action))
        } else {
            yield put(saveEcluBussinessDetailsFail(response, action))
        }
    } catch (e) {
        yield put(saveEcluBussinessDetailsFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(SAVE_ECLU_BUSSINESS_DETAILS, saveEcluBussinessDetailsSaga);
}