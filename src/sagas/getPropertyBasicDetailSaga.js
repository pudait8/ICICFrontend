import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_PROPERTY_BASIC_DETAIL, getPropertyBasicDetailSuccess, getPropertyBasicDetailFail, getPropertyBasicDetailAlert,
} from '../actions/getPropertyBasicDetailAction'
import getPropertyBasicDetailApi from '../apis/getPropertyBasicDetailApi'


export function* getPropertyBasicDetailSaga(action) {
    try {
        const response = yield call(() => getPropertyBasicDetailApi(action.params))
        if (response.data.Status === 1) {
            yield put(getPropertyBasicDetailAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getPropertyBasicDetailSuccess(response, action))
        } else {
            yield put(getPropertyBasicDetailFail(response, action))
        }
    } catch (e) {
        yield put(getPropertyBasicDetailFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_PROPERTY_BASIC_DETAIL, getPropertyBasicDetailSaga);
}