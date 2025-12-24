import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_PROPERTY_AREA_UNIT, getPropertyAreaUnitListSuccess,
    getPropertyAreaUnitListAlert, getPropertyAreaUnitListFail
} from '../actions/getPropertyAreaUnitListAction'
import GetPropertyAreaUnitList from '../apis/getPropertyAreaUnitListApi'


export function* getPropertyAreaUnitListSaga(action) {
    try {
        const response = yield call(() => GetPropertyAreaUnitList(action.params))
        if (response.data.Status === 1) {
            yield put(getPropertyAreaUnitListAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getPropertyAreaUnitListSuccess(response, action))
        } else {
            yield put(getPropertyAreaUnitListFail(response, action))
        }
    } catch (e) {
        yield put(getPropertyAreaUnitListFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_PROPERTY_AREA_UNIT, getPropertyAreaUnitListSaga);
}