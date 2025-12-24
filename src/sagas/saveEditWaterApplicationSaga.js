import { call, put, takeLatest } from 'redux-saga/effects'

import {
    SAVE_EDIT_WATER_APPLICATION,
    saveEditWaterApplicationSuccess,
    saveEditWaterApplicationFail,
    saveEditWaterApplicationAlert,
} from '../actions/saveEditWaterApplicationAction'
import saveEditWaterApplicationApi from '../apis/saveEditWaterApplicationApi'


export function* saveEditWaterApplicationSaga(action) {
    try {
        const response = yield call(() => saveEditWaterApplicationApi(action.params))
        if (response.data.Status === 1) {
            yield put(saveEditWaterApplicationAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(saveEditWaterApplicationSuccess(response, action))
        } else {
            yield put(saveEditWaterApplicationFail(response, action))
        }
    } catch (e) {
        yield put(saveEditWaterApplicationFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(SAVE_EDIT_WATER_APPLICATION, saveEditWaterApplicationSaga);
}