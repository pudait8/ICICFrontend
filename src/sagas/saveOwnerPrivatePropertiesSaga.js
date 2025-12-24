import { call, put, takeLatest } from 'redux-saga/effects'

import {
    SAVE_OWNER_PRIVATE_PROPERTIES, saveOwnerPrivatePropertiesSuccess, saveOwnerPrivatePropertiesFail, saveOwnerPrivatePropertiesAlert,
} from '../actions/saveOwnerPrivatePropertiesAction'

import saveOwnerPrivatePropertiesApi from '../apis/saveOwnerPrivatePropertiesApi'


export function* saveOwnerPrivatePropertiesSaga(action) {
    try {
        const response = yield call(() => saveOwnerPrivatePropertiesApi(action.params))
        if (response.data.Status === 1) {
            yield put(saveOwnerPrivatePropertiesAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(saveOwnerPrivatePropertiesSuccess(response, action))
        } else {
            yield put(saveOwnerPrivatePropertiesFail(response, action))
        }
    } catch (e) {
        yield put(saveOwnerPrivatePropertiesFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(SAVE_OWNER_PRIVATE_PROPERTIES, saveOwnerPrivatePropertiesSaga);
}