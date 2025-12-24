import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_PURCHASER_LIST,
    getPurchaserListSuccess,
    getPurchaserListFail,
    getPurchaserListAlert,
} from '../actions/getPurchaserListAction'
import getPurchaserListApi from '../apis/getPurchaserListApi'


export function* getPurchaserListSaga(action) {
    try {
        const response = yield call(() => getPurchaserListApi(action.params))
        if (response.data.Status === 1) {
            yield put(getPurchaserListAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getPurchaserListSuccess(response, action))
        } else {
            yield put(getPurchaserListFail(response, action))
        }
    } catch (e) {
        yield put(getPurchaserListFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_PURCHASER_LIST, getPurchaserListSaga);
}