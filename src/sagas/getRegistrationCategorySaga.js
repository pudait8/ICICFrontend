import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_REGISTRATION_CATEGORY, getRegistrationCategorySuccess, getRegistrationCategoryFail, getRegistrationCategoryAlert,
} from '../actions/getRegistrationCategoryAction'
import getRegistrationCategoryApi from '../apis/getRegistrationCategoryApi'


export function* getRegistrationCategorySaga(action) {
    try {
        const response = yield call(() => getRegistrationCategoryApi(action.params))
        if (response.data.Status === 1) {
            yield put(getRegistrationCategoryAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getRegistrationCategorySuccess(response, action))
        } else {
            yield put(getRegistrationCategoryFail(response, action))
        }
    } catch (e) {
        yield put(getRegistrationCategoryFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_REGISTRATION_CATEGORY, getRegistrationCategorySaga);
}