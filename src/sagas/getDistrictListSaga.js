import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_DISTRICT_LIST,
    getDistrictListSuccess,
    getDistrictListFail,
    getDistrictListAlert,
} from '../actions/getDistrictListAction'
import getDistrictListApi from '../apis/getDistrictListApi'


export function* getDistrictListSaga(action) {
    try {
        const response = yield call(() => getDistrictListApi(action.params))
        if (response.data.Status === 1) {
            yield put(getDistrictListAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getDistrictListSuccess(response, action))
        } else {
            yield put(getDistrictListFail(response, action))
        }
    } catch (e) {
        yield put(getDistrictListFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_DISTRICT_LIST, getDistrictListSaga);
}