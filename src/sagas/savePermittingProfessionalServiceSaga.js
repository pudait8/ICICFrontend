import { call, put, takeLatest } from 'redux-saga/effects'

import {
    SAVE_PERMITTING_PROFESSIONAL_SERVICE,
    savePermittingProfessionalServiceSuccess,
    savePermittingProfessionalServiceFail,
    savePermittingProfessionalServiceAlert,
} from '../actions/savePermittingProfessionalServiceAction'
import savePermittingProfessionalServiceApi from '../apis/savePermittingProfessionalServiceApi'


export function* savePermittingProfessionalServiceSaga(action) {
    try {
        const response = yield call(() => savePermittingProfessionalServiceApi(action.params))
        if (response.data.Status === 1) {
            yield put(savePermittingProfessionalServiceAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(savePermittingProfessionalServiceSuccess(response, action))
        } else {
            yield put(savePermittingProfessionalServiceFail(response, action))
        }
    } catch (e) {
        yield put(savePermittingProfessionalServiceFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(SAVE_PERMITTING_PROFESSIONAL_SERVICE, savePermittingProfessionalServiceSaga);
}