import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_PROPERTY_PERMISSIONS_DETAIL, getPropertyPermissionsDetailSuccess, getPropertyPermissionsDetailFail, getPropertyPermissionsDetailAlert,
} from '../actions/getPropertyPermissionsDetailAction'
import getPropertyPermissionDetailApi from '../apis/getPropertyPermissionDetailApi'


export function* getPropertyPermissionsDetailSaga(action) {
    try {
        const response = yield call(() => getPropertyPermissionDetailApi(action.params))
        if (response.data.Status === 1) {
            yield put(getPropertyPermissionsDetailAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getPropertyPermissionsDetailSuccess(response, action))
        } else {
            yield put(getPropertyPermissionsDetailFail(response, action))
        }
    } catch (e) {
        yield put(getPropertyPermissionsDetailFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_PROPERTY_PERMISSIONS_DETAIL, getPropertyPermissionsDetailSaga);
}