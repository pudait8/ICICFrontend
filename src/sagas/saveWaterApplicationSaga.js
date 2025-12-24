import { call, put, takeLatest } from 'redux-saga/effects'

import {
    SAVE_WATER_APPLICATION,
    saveWaterApplicationSuccess,
    saveWaterApplicationFail,
    saveWaterApplicationAlert,
} from '../actions/saveWaterApplicationAction'
import saveWaterApplicationApi from '../apis/saveWaterApplicationApi'


export function* saveWaterApplicationSaga(action) {
    try {
        const response = yield call(() => saveWaterApplicationApi(action.params))
        if (response.data.Status === 1) {
            yield put(saveWaterApplicationAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(saveWaterApplicationSuccess(response, action))
        } else {
            yield put(saveWaterApplicationFail(response, action))
        }
    } catch (e) {
        yield put(saveWaterApplicationFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(SAVE_WATER_APPLICATION, saveWaterApplicationSaga);
}