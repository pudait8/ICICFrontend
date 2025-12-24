import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_PROPERTY_DETAIL_BY_NOC_NUMBER, getPropertyDetailByNocNumberSuccess, getPropertyDetailByNocNumberFail, getPropertyDetailByNocNumberAlert,
} from '../actions/getPropertyDetailByNocNumberActions'
import getPropertyDetailByNocNumberApi from '../apis/getPropertyDetailByNocNumberApi'


export function* getPropertyDetailByNocNumberSaga(action) {
    try {
        const response = yield call(() => getPropertyDetailByNocNumberApi(action.params))
        if (response.data.Status === 1) {
            yield put(getPropertyDetailByNocNumberAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getPropertyDetailByNocNumberSuccess(response, action))
        } else {
            yield put(getPropertyDetailByNocNumberFail(response, action))
        }
    } catch (e) {
        yield put(getPropertyDetailByNocNumberFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_PROPERTY_DETAIL_BY_NOC_NUMBER, getPropertyDetailByNocNumberSaga);
}