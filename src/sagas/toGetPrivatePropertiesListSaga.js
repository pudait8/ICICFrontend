import { call, put, takeLatest } from 'redux-saga/effects'

import {
    TO_GET_PRIVATE_PROPERTIES_LIST, toGetPrivatePropertiesListSuccess, toGetPrivatePropertiesListFail, toGetPrivatePropertiesListAlert
} from '../actions/toGetPrivatePropertiesListAction'
import toGetPrivatePropertiesListApi from '../apis/toGetPrivatePropertiesListApi'


export function* toGetPrivatePropertiesListSaga(action) {
    try {
        const response = yield call(() => toGetPrivatePropertiesListApi(action.params))
        if (response.data.Status === 1) {
            yield put(toGetPrivatePropertiesListAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(toGetPrivatePropertiesListSuccess(response, action))
        } else {
            yield put(toGetPrivatePropertiesListFail(response, action))
        }
    } catch (e) {
        yield put(toGetPrivatePropertiesListFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(TO_GET_PRIVATE_PROPERTIES_LIST, toGetPrivatePropertiesListSaga);
}