import { call, put, takeLatest } from 'redux-saga/effects'

import {
    SAVE_PROFESSIONAL_SERVICE,
    saveProfessionalServiceSuccess,
    saveProfessionalServiceFail,
    saveProfessionalServiceAlert,
} from '../actions/saveProfessionalServiceAction'
import saveProfessionalServiceApi from '../apis/saveProfessionalServiceApi'


export function* saveProfessionalServiceSaga(action) {
    try {
        const response = yield call(() => saveProfessionalServiceApi(action.params))
        if (response.data.Status === 1) {
            yield put(saveProfessionalServiceAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(saveProfessionalServiceSuccess(response, action))
        } else {
            yield put(saveProfessionalServiceFail(response, action))
        }
    } catch (e) {
        yield put(saveProfessionalServiceFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(SAVE_PROFESSIONAL_SERVICE, saveProfessionalServiceSaga);
}