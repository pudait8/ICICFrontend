import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_COLONIES_LIST,
    getColoniesListSuccess,
    getColoniesListFail,
    getColoniesListAlert,
} from '../actions/getColoniesListAction'
import getColoniesListApi from '../apis/getColoniesListApi'


export function* getColoniesListSaga(action) {
    try {
        const response = yield call(() => getColoniesListApi(action.params))
        if (response.data.Status === 1) {
            yield put(getColoniesListAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getColoniesListSuccess(response, action))
        } else {
            yield put(getColoniesListFail(response, action))
        }
    } catch (e) {
        yield put(getColoniesListFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_COLONIES_LIST, getColoniesListSaga);
}