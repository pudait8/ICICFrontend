import { call, put, takeLatest } from 'redux-saga/effects'

import {
    CITIZEN_SIGNUP,
    citizenSignupSuccess,
    citizenSignupFail,
    citizenSignupAlert,
} from '../actions/citizenSignupAction'
import citizenSignupApi from '../apis/citizenSignupApi'


export function* citizenSignupSaga(action) {
    try {
        const response = yield call(() => citizenSignupApi(action.params))
        if (response.data.Status === 1) {
            yield put(citizenSignupAlert(response, action))
        } else if (response.data.Status === 2) {
            yield put(citizenSignupSuccess(response, action))
        } else {
            yield put(citizenSignupFail(response, action))
        }
    } catch (e) {
        yield put(citizenSignupFail(e.message, action))
    }
}

export default function* MySaga() {
    yield takeLatest(CITIZEN_SIGNUP, citizenSignupSaga);
}