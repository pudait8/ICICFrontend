import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_GRIEVANCE_PERTAINS_TO_LIST,
    getGrievancePertainsToListSuccess,
    getGrievancePertainsToListFail,
    getGrievancePertainsToListAlert,
} from '../actions/getGrievancePertainsToListAction'
import getGrievancePertainsToListApi from '../apis/getGrievancePertainsToListApi'


export function* getGrievancePertainsToListSaga(action) {
    try {
        const response = yield call(() => getGrievancePertainsToListApi(action.params))
        if (response.data.Status === 1) {
            yield put(getGrievancePertainsToListAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getGrievancePertainsToListSuccess(response, action))
        } else {
            yield put(getGrievancePertainsToListFail(response, action))
        }
    } catch (e) {
        yield put(getGrievancePertainsToListFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_GRIEVANCE_PERTAINS_TO_LIST, getGrievancePertainsToListSaga);
}