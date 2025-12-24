import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_ENTREPRENEUR_DETAIL_BY_PAN, getEntrepreneurDetailByPanSuccess, getEntrepreneurDetailByPanFail, getEntrepreneurDetailByPanAlert,
} from '../actions/getEntrepreneurDetailByPanAction'
import getEntrepreneurDetailByPanApi from '../apis/getEntrepreneurDetailByPanApi'


export function* getEntrepreneurDetailByPanSaga(action) {
    try {
        const response = yield call(() => getEntrepreneurDetailByPanApi(action.params))
        if (response.data.Status === 1) {
            yield put(getEntrepreneurDetailByPanAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getEntrepreneurDetailByPanSuccess(response, action))
        } else {
            yield put(getEntrepreneurDetailByPanFail(response, action))
        }
    } catch (e) {
        yield put(getEntrepreneurDetailByPanFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_ENTREPRENEUR_DETAIL_BY_PAN, getEntrepreneurDetailByPanSaga)
}