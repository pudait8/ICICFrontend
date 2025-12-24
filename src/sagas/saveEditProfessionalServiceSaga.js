import { call, put, takeLatest } from 'redux-saga/effects'

import {
    SAVE_EDIT_PROFESSIONAL_SERVICE,
    saveEditProfessionalServiceSuccess,
    saveEditProfessionalServiceFail,
    saveEditProfessionalServiceAlert,
} from '../actions/saveEditProfessionalServiceAction'
import saveEditProfessionalServiceApi from '../apis/saveEditProfessionalServiceApi'


export function* saveEditProfessionalServiceSaga(action) {
    try {
        const response = yield call(() => saveEditProfessionalServiceApi(action.params))
        if (response.data.Status === 1) {
            yield put(saveEditProfessionalServiceAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(saveEditProfessionalServiceSuccess(response, action))
        } else {
            yield put(saveEditProfessionalServiceFail(response, action))
        }
    } catch (e) {
        yield put(saveEditProfessionalServiceFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(SAVE_EDIT_PROFESSIONAL_SERVICE, saveEditProfessionalServiceSaga);
}