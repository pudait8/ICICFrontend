import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_GRIEVANCE_DETAIL, getGrievanceDetailSuccess, getGrievanceDetailFail, getGrievanceDetailAlert,
} from '../actions/getGrievanceDetailAction'
import getGrievanceDetailApi from '../apis/getGrievanceDetailApi'


export function* getGrievanceDetailSaga(action) {
    try {
        const response = yield call(() => getGrievanceDetailApi(action.params))
        if (response.data.Status === 1) {
            yield put(getGrievanceDetailAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getGrievanceDetailSuccess(response, action))
        } else {
            yield put(getGrievanceDetailFail(response, action))
        }
    } catch (e) {
        yield put(getGrievanceDetailFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_GRIEVANCE_DETAIL, getGrievanceDetailSaga);
}