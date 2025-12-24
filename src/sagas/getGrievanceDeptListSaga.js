import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_GRIEVANCE_DEPT_LIST,
    getGrievanceDeptListSuccess,
    getGrievanceDeptListFail,
    getGrievanceDeptListAlert,
} from '../actions/getGrievanceDeptListAction'
import getGrievanceDeptListApi from '../apis/getGrievanceDeptListApi'


export function* getGrievanceDeptListSaga(action) {
    try {
        const response = yield call(() => getGrievanceDeptListApi(action.params))
        if (response.data.Status === 1) {
            yield put(getGrievanceDeptListAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getGrievanceDeptListSuccess(response, action))
        } else {
            yield put(getGrievanceDeptListFail(response, action))
        }
    } catch (e) {
        yield put(getGrievanceDeptListFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_GRIEVANCE_DEPT_LIST, getGrievanceDeptListSaga);
}