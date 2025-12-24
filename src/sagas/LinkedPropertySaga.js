import { call, put, takeLatest } from 'redux-saga/effects'

import {
	LINKED_PROPERTY_REQUEST_LIST, linkedPropertyRequestListSuccess, linkedPropertyRequestListFail, linkedPropertyRequestListAlert,
} from '../actions/LinkedPropertyAction'
import linkedPropertyListApi from '../apis/linkedPropertyListApi'


export function* linkedPropertyRequestListSaga(action) {
	try {
		const response = yield call(() => linkedPropertyListApi(action.params))
		if (response.data.Status === 1) {
			yield put(linkedPropertyRequestListAlert(response, action))
		} else if (response.data.Status === 2) {
			yield put(linkedPropertyRequestListSuccess(response, action))
		} else {
			yield put(linkedPropertyRequestListFail(response, action))
		}
	} catch (e) {
		yield put(linkedPropertyRequestListFail(e.message, action))
	}
}

export default function* MySaga() {
	yield takeLatest(LINKED_PROPERTY_REQUEST_LIST, linkedPropertyRequestListSaga)
}