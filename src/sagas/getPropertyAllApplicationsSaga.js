import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_PROPERTY_ALL_APPLICATIONS, getPropertyAllApplicationsSuccess, getPropertyAllApplicationsFail, getPropertyAllApplicationsAlert,
} from '../actions/getPropertyAllApplicationsAction'
import getPropertyAllApplicationsApi from '../apis/getPropertyAllApplicationsApi'


export function* getPropertyAllApplicationsSaga(action) {
    try {
        const response = yield call(() => getPropertyAllApplicationsApi(action.params))
        if (response.data.Status === 1) {
            yield put(getPropertyAllApplicationsAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getPropertyAllApplicationsSuccess(response, action))
        } else {
            yield put(getPropertyAllApplicationsFail(response, action))
        }
    } catch (e) {
        yield put(getPropertyAllApplicationsFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_PROPERTY_ALL_APPLICATIONS, getPropertyAllApplicationsSaga);
}