import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GET_CONSTITUTION_TYPE_LIST, getConstitutionTypeListSuccess, getConstitutionTypeListFail, getConstitutionTypeListAlert,
} from '../actions/getConstitutionTypeListAction'
import getConstitutionTypeListApi from '../apis/getConstitutionTypeListApi'


export function* getConstitutionTypeListSaga(action) {
    try {
        const response = yield call(() => getConstitutionTypeListApi(action.params))
        if (response.data.Status === 1) {
            yield put(getConstitutionTypeListAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(getConstitutionTypeListSuccess(response, action))
        } else {
            yield put(getConstitutionTypeListFail(response, action))
        }
    } catch (e) {
        yield put(getConstitutionTypeListFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(GET_CONSTITUTION_TYPE_LIST, getConstitutionTypeListSaga)
}