import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_CURRENT_OWNERS_BY_PROPERTY_REF_ID,
    getCurrentOwnersByPropertyRefIdSuccess,
    getCurrentOwnersByPropertyRefIdFail,
    getCurrentOwnersByPropertyRefIdAlert,
} from '../actions/getCurrentOwnersByPropertyRefIdAction'
import getCurrentOwnersByPropertyRefIdApi from '../apis/getCurrentOwnersByPropertyRefIdApi'


export function* getCurrentOwnersByPropertyRefIdSaga(action) {
    try {
        const response = yield call(() => getCurrentOwnersByPropertyRefIdApi(action.params))
        if (response.data.Status === 1) {
            yield put(getCurrentOwnersByPropertyRefIdAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getCurrentOwnersByPropertyRefIdSuccess(response, action))
        } else {
            yield put(getCurrentOwnersByPropertyRefIdFail(response, action))
        }
    } catch (e) {
        yield put(getCurrentOwnersByPropertyRefIdFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_CURRENT_OWNERS_BY_PROPERTY_REF_ID, getCurrentOwnersByPropertyRefIdSaga);
}