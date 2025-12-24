import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_GRIEVANCE_DESG_LIST,
    getGrievanceDesgListSuccess,
    getGrievanceDesgListFail,
    getGrievanceDesgListAlert,
} from '../actions/getGrievanceDesgListAction'
import getGrievanceDesgListApi from '../apis/getGrievanceDesgListApi'


export function* getGrievanceDesgListSaga(action) {
    try {
        const response = yield call(() => getGrievanceDesgListApi(action.params))
        if (response.data.Status === 1) {
            yield put(getGrievanceDesgListAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getGrievanceDesgListSuccess(response, action))
        } else {
            yield put(getGrievanceDesgListFail(response, action))
        }
    } catch (e) {
        yield put(getGrievanceDesgListFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_GRIEVANCE_DESG_LIST, getGrievanceDesgListSaga);
}