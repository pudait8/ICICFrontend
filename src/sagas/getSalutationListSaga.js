import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_SALUTATION_LIST, getSalutationListSuccess, getSalutationListFail, getSalutationListAlert,
} from '../actions/getSalutationListActions'
import getSalutationListApi from '../apis/getSalutationListApi'


export function* getSalutationListSaga(action) {
    try {
        const response = yield call(() => getSalutationListApi(action.params))
        if (response.data.Status === 1) {
            yield put(getSalutationListAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getSalutationListSuccess(response, action))
        } else {
            yield put(getSalutationListFail(response, action))
        }
    } catch (e) {
        yield put(getSalutationListFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_SALUTATION_LIST, getSalutationListSaga)
}