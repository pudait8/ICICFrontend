import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import {
	REQUEST_LOCATION_LIST, requestLocationListSuccess, requestLocationListFail, requestLocationListAlert,
	REQUEST_SECTOR_LIST, requestSectorListSuccess, requestSectorListFail, requestSectorListAlert,
	REQUEST_USAGE_TYPES_LIST, requestUsageTypesListSuccess, requestUsageTypesListFail, requestUsageTypesListAlert,
	REQUEST_PROPERTY_TYPE_LIST, requestPropertyTypeListSuccess, requestPropertyTypeListFail, requestPropertyTypeListAlert,
	REQUEST_PROPERTY_NUMBER_LIST, requestPropertyNumberListSuccess, requestPropertyNumberListFail, requestPropertyNumberListAlert,
	GET_UPN_SEND_OTP, getUpnSendOtpSuccess, getUpnSendOtpFail, getUpnSendOtpAlert,
	GET_UPN_VERIFY_OTP, getUpnVerifyOtpSuccess, getUpnVerifyOtpFail, getUpnVerifyOtpAlert,
	GET_UPN_NUMBER, getUpnNumberSuccess, getUpnNumberFail, getUpnNumberAlert,
} from '../actions/GetUpnActions'
import { fetchLocationList, fetchSectorList, fetchUsageTypesList } from '../apis/fetchLocationList';
import fetchPropertyTypesList from '../apis/fetchPropertyTypeList';
import fetchPropertyNumberList from '../apis/fetchPropertyNumberListApi';
import getUpnSendOtpApi from '../apis/getUpnSendOtpApi'
import getUpnApi from '../apis/getUpnApi'
import getUpnVerifyOtpApi from '../apis/getUpnVerifyOtpApi'


export function* LocationListSaga(action) {
	try {
		const response = yield call(() => fetchLocationList(action.AuthorityId));
		if (response.data.Status === 1) {
			yield put(requestLocationListAlert(response, action));
		} else if (response.data.Status === 2) {
			yield put(requestLocationListSuccess(response, action));
		} else {
			yield put(requestLocationListFail(response, action));
		}
	} catch (e) {
		yield put(requestLocationListFail(e.message, action));
	}
}

export function* SectorListSaga(action) {
	try {
		const response = yield call(() => fetchSectorList(action.params));
		if (response.data.Status === 1) {
			yield put(requestSectorListAlert(response, action));
		} else if (response.data.Status === 2) {
			yield put(requestSectorListSuccess(response, action));
		} else {
			yield put(requestSectorListFail(response, action));
		}
	} catch (e) {
		yield put(requestSectorListFail(e.message, action));
	}
}

export function* UsageTypesListSaga(action) {
	try {
		const response = yield call(() => fetchUsageTypesList(action.params));
		if (response.data.Status === 1) {
			yield put(requestUsageTypesListAlert(response, action));
		} else if (response.data.Status === 2) {
			yield put(requestUsageTypesListSuccess(response, action));
		} else {
			yield put(requestUsageTypesListFail(response, action));
		}
	} catch (e) {
		yield put(requestUsageTypesListFail(e.message, action));
	}
}

export function* PropertyTypeListSaga(action) {
	try {
		const response = yield call(() => fetchPropertyTypesList(action.params));
		if (response.data.Status === 1) {
			yield put(requestPropertyTypeListAlert(response, action));
		} else if (response.data.Status === 2) {
			yield put(requestPropertyTypeListSuccess(response, action));
		} else {
			yield put(requestPropertyTypeListFail(response, action));
		}
	} catch (e) {
		yield put(requestPropertyTypeListFail(e.message, action));
	}
}

export function* PropertyNumberListSaga(action) {
	try {
		const response = yield call(() => fetchPropertyNumberList(action.params));
		if (response.data.Status === 1) {
			yield put(requestPropertyNumberListAlert(response, action));
		} else if (response.data.Status === 2) {
			yield put(requestPropertyNumberListSuccess(response, action));
		} else {
			yield put(requestPropertyNumberListFail(response, action));
		}
	} catch (e) {
		yield put(requestPropertyNumberListFail(e.message, action));
	}
}

export function* getUpnSendOtpSaga(action) {
	try {
		const response = yield call(() => getUpnSendOtpApi(action.params));
		if (response.data.Status === 1) {
			yield put(getUpnSendOtpAlert(response, action));
		} else if (response.data.Status === 2) {
			yield put(getUpnSendOtpSuccess(response, action));
		} else {
			yield put(getUpnSendOtpFail(response, action));
		}
	} catch (e) {
		yield put(getUpnSendOtpFail(e.message, action));
	}
}
export function* getUpnNumberSaga(action) {
	try {
		const response = yield call(() => getUpnApi(action.params));
		if (response.data.Status === 1) {
			yield put(getUpnNumberAlert(response, action));
		} else if (response.data.Status === 2) {
			yield put(getUpnNumberSuccess(response, action));
		} else {
			yield put(getUpnNumberFail(response, action));
		}
	} catch (e) {
		yield put(getUpnNumberFail(e.message, action));
	}
}

export function* getUpnVerifyOtpSaga(action) {
	try {
		const response = yield call(() => getUpnVerifyOtpApi(action.params));
		if (response.data.Status === 1) {
			yield put(getUpnVerifyOtpAlert(response, action));
		} else if (response.data.Status === 2) {
			yield put(getUpnVerifyOtpSuccess(response, action));
		} else {
			yield put(getUpnVerifyOtpFail(response, action));
		}
	} catch (e) {
		yield put(getUpnVerifyOtpFail(e.message, action));
	}
}



export default function* MySaga() {
	yield takeLatest(REQUEST_LOCATION_LIST, LocationListSaga);
	yield takeLatest(REQUEST_SECTOR_LIST, SectorListSaga);
	yield takeLatest(REQUEST_USAGE_TYPES_LIST, UsageTypesListSaga);
	yield takeLatest(REQUEST_PROPERTY_TYPE_LIST, PropertyTypeListSaga);
	yield takeLatest(REQUEST_PROPERTY_NUMBER_LIST, PropertyNumberListSaga);
	yield takeLatest(GET_UPN_SEND_OTP, getUpnSendOtpSaga);
	yield takeLatest(GET_UPN_NUMBER, getUpnNumberSaga);
	yield takeLatest(GET_UPN_VERIFY_OTP, getUpnVerifyOtpSaga);
}