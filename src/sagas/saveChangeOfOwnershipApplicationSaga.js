import { call, put, takeLatest } from 'redux-saga/effects'

import {
    SAVE_CHANGE_OF_OWNERSHIP_APPLICATION, saveChangeOfOwnershipApplicationSuccess, saveChangeOfOwnershipApplicationFail, saveChangeOfOwnershipApplicationAlert,
} from '../actions/saveChangeOfOwnershipApplicationAction'
import saveChangeOfOwnershipApplicationApi from '../apis/saveChangeOfOwnershipApplicationApi'


export function* saveChangeOfOwnershipApplicationSaga(action) {
    try {
        const response = yield call(() => saveChangeOfOwnershipApplicationApi(action.params))
        if (response.data.Status === 1) {
            yield put(saveChangeOfOwnershipApplicationAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(saveChangeOfOwnershipApplicationSuccess(response, action))
        } else {
            yield put(saveChangeOfOwnershipApplicationFail(response, action))
        }
    } catch (e) {
        yield put(saveChangeOfOwnershipApplicationFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(SAVE_CHANGE_OF_OWNERSHIP_APPLICATION, saveChangeOfOwnershipApplicationSaga);
}