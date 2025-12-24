import { call, put, takeLatest } from 'redux-saga/effects'

import {
    SAVE_ECLU_LAND_DETAILS,
    saveEcluLandDetailsSuccess,
    saveEcluLandDetailsFail,
    saveEcluLandDetailsAlert,
} from '../actions/saveEcluLandDetailsAction'
import saveEcluLandDetailsApi from '../apis/saveEcluLandDetailsApi'


export function* saveEcluLandDetailsSaga(action) {
    try {
        const response = yield call(() => saveEcluLandDetailsApi(action.params))
        if (response.data.Status === 1) {
            yield put(saveEcluLandDetailsAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(saveEcluLandDetailsSuccess(response, action))
        } else {
            yield put(saveEcluLandDetailsFail(response, action))
        }
    } catch (e) {
        yield put(saveEcluLandDetailsFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(SAVE_ECLU_LAND_DETAILS, saveEcluLandDetailsSaga);
}