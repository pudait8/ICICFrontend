export const REQUEST_AUTHORITY_LIST = 'REQUEST_AUTHORITY_LIST'
export const REQUEST_AUTHORITY_LIST_SUCCESS = 'REQUEST_AUTHORITY_LIST_SUCCESS'
export const REQUEST_AUTHORITY_LIST_FAIL = 'REQUEST_AUTHORITY_LIST_FAIL'
export const REQUEST_AUTHORITY_LIST_ALERT = 'REQUEST_AUTHORITY_LIST_ALERT'

export const requestAuthorityList = () => {
    return { type: REQUEST_AUTHORITY_LIST }
}

export const requestAuthorityListSuccess = (response) => {
    return { type: REQUEST_AUTHORITY_LIST_SUCCESS, response }
}

export const requestAuthorityListFail = (response) => {
    return { type: REQUEST_AUTHORITY_LIST_FAIL, response }
}

export const requestAuthorityListAlert = (response) => {
    return { type: REQUEST_AUTHORITY_LIST_ALERT, response }
}



export const REQUEST_LOCATION_LIST = 'REQUEST_LOCATION_LIST'
export const REQUEST_LOCATION_LIST_SUCCESS = 'REQUEST_LOCATION_LIST_SUCCESS'
export const REQUEST_LOCATION_LIST_FAIL = 'REQUEST_LOCATION_LIST_FAIL'
export const REQUEST_LOCATION_LIST_ALERT = 'REQUEST_LOCATION_LIST_ALERT'

export const requestLocationList = (AuthorityId) => {
    return { type: REQUEST_LOCATION_LIST, AuthorityId }
}

export const requestLocationListSuccess = (response) => {
    return { type: REQUEST_LOCATION_LIST_SUCCESS, response }
}

export const requestLocationListFail = (response) => {
    return { type: REQUEST_LOCATION_LIST_FAIL, response }
}

export const requestLocationListAlert = (response) => {
    return { type: REQUEST_LOCATION_LIST_ALERT, response }
}

// Actions for sector list
export const REQUEST_SECTOR_LIST = 'REQUEST_SECTOR_LIST'
export const REQUEST_SECTOR_LIST_SUCCESS = 'REQUEST_SECTOR_LIST_SUCCESS'
export const REQUEST_SECTOR_LIST_FAIL = 'REQUEST_SECTOR_LIST_FAIL'
export const REQUEST_SECTOR_LIST_ALERT = 'REQUEST_SECTOR_LIST_ALERT'

export const requestSectorList = (params) => {
    return { type: REQUEST_SECTOR_LIST, params }
}

export const requestSectorListSuccess = (response) => {
    return { type: REQUEST_SECTOR_LIST_SUCCESS, response }
}

export const requestSectorListFail = (response) => {
    return { type: REQUEST_SECTOR_LIST_FAIL, response }
}

export const requestSectorListAlert = (response) => {
    return { type: REQUEST_SECTOR_LIST_ALERT, response }
}

// Actions for UsageTypes list
export const REQUEST_USAGE_TYPES_LIST = 'REQUEST_USAGE_TYPES_LIST'
export const REQUEST_USAGE_TYPES_LIST_SUCCESS = 'REQUEST_USAGE_TYPES_LIST_SUCCESS'
export const REQUEST_USAGE_TYPES_LIST_FAIL = 'REQUEST_USAGE_TYPES_LIST_FAIL'
export const REQUEST_USAGE_TYPES_LIST_ALERT = 'REQUEST_USAGE_TYPES_LIST_ALERT'

export const requestUsageTypesList = (params) => {
    return { type: REQUEST_USAGE_TYPES_LIST, params }
}

export const requestUsageTypesListSuccess = (response) => {
    return { type: REQUEST_USAGE_TYPES_LIST_SUCCESS, response }
}

export const requestUsageTypesListFail = (response) => {
    return { type: REQUEST_USAGE_TYPES_LIST_FAIL, response }
}

export const requestUsageTypesListAlert = (response) => {
    return { type: REQUEST_USAGE_TYPES_LIST_ALERT, response }
}

// Actions for PropertyType list
export const REQUEST_PROPERTY_TYPE_LIST = 'REQUEST_PROPERTY_TYPE_LIST'
export const REQUEST_PROPERTY_TYPE_LIST_SUCCESS = 'REQUEST_PROPERTY_TYPE_LIST_SUCCESS'
export const REQUEST_PROPERTY_TYPE_LIST_FAIL = 'REQUEST_PROPERTY_TYPE_LIST_FAIL'
export const REQUEST_PROPERTY_TYPE_LIST_ALERT = 'REQUEST_PROPERTY_TYPE_LIST_ALERT'

export const requestPropertyTypeList = (params) => {
    return { type: REQUEST_PROPERTY_TYPE_LIST, params }
}

export const requestPropertyTypeListSuccess = (response) => {
    return { type: REQUEST_PROPERTY_TYPE_LIST_SUCCESS, response }
}

export const requestPropertyTypeListFail = (response) => {
    return { type: REQUEST_PROPERTY_TYPE_LIST_FAIL, response }
}

export const requestPropertyTypeListAlert = (response) => {
    return { type: REQUEST_PROPERTY_TYPE_LIST_ALERT, response }
}

// Actions for Search PropertyNumber list
export const REQUEST_PROPERTY_NUMBER_LIST = 'REQUEST_PROPERTY_NUMBER_LIST'
export const REQUEST_PROPERTY_NUMBER_LIST_SUCCESS = 'REQUEST_PROPERTY_NUMBER_LIST_SUCCESS'
export const REQUEST_PROPERTY_NUMBER_LIST_FAIL = 'REQUEST_PROPERTY_NUMBER_LIST_FAIL'
export const REQUEST_PROPERTY_NUMBER_LIST_ALERT = 'REQUEST_PROPERTY_NUMBER_LIST_ALERT'

export const requestPropertyNumberList = (params) => {
    return { type: REQUEST_PROPERTY_NUMBER_LIST, params }
}

export const requestPropertyNumberListSuccess = (response) => {
    return { type: REQUEST_PROPERTY_NUMBER_LIST_SUCCESS, response }
}

export const requestPropertyNumberListFail = (response) => {
    return { type: REQUEST_PROPERTY_NUMBER_LIST_FAIL, response }
}

export const requestPropertyNumberListAlert = (response) => {
    return { type: REQUEST_PROPERTY_NUMBER_LIST_ALERT, response }
}

// Actions for Validation form data and send OTP
// getUpnSendOtp

export const GET_UPN_SEND_OTP = 'GET_UPN_SEND_OTP'
export const GET_UPN_SEND_OTP_SUCCESS = 'GET_UPN_SEND_OTP_SUCCESS'
export const GET_UPN_SEND_OTP_FAIL = 'GET_UPN_SEND_OTP_FAIL'
export const GET_UPN_SEND_OTP_ALERT = 'GET_UPN_SEND_OTP_ALERT'

export const getUpnSendOtp = (params) => {
    return { type: GET_UPN_SEND_OTP, params }
}

export const getUpnSendOtpSuccess = (response) => {
    return { type: GET_UPN_SEND_OTP_SUCCESS, response }
}

export const getUpnSendOtpFail = (response) => {
    return { type: GET_UPN_SEND_OTP_FAIL, response }
}

export const getUpnSendOtpAlert = (response) => {
    return { type: GET_UPN_SEND_OTP_ALERT, response }
}

// Actions for Validation form data and get UPN Number
// getUpnNumber

export const GET_UPN_NUMBER = 'GET_UPN_NUMBER'
export const GET_UPN_NUMBER_SUCCESS = 'GET_UPN_NUMBER_SUCCESS'
export const GET_UPN_NUMBER_FAIL = 'GET_UPN_NUMBER_FAIL'
export const GET_UPN_NUMBER_ALERT = 'GET_UPN_NUMBER_ALERT'

export const getUpnNumber = (params) => {
    return { type: GET_UPN_NUMBER, params }
}

export const getUpnNumberSuccess = (response) => {
    return { type: GET_UPN_NUMBER_SUCCESS, response }
}

export const getUpnNumberFail = (response) => {
    return { type: GET_UPN_NUMBER_FAIL, response }
}

export const getUpnNumberAlert = (response) => {
    return { type: GET_UPN_NUMBER_ALERT, response }
}



// Actions for verify OTP and submit the form
// getUpnVerifyOtp

export const GET_UPN_VERIFY_OTP = 'GET_UPN_VERIFY_OTP'
export const GET_UPN_VERIFY_OTP_SUCCESS = 'GET_UPN_VERIFY_OTP_SUCCESS'
export const GET_UPN_VERIFY_OTP_FAIL = 'GET_UPN_VERIFY_OTP_FAIL'
export const GET_UPN_VERIFY_OTP_ALERT = 'GET_UPN_VERIFY_OTP_ALERT'
export const GTE_UPN_RESET_STATE = 'GTE_UPN_RESET_STATE'

export const getUpnVerifyOtp = (params) => {
    return { type: GET_UPN_VERIFY_OTP, params }
}

export const getUpnVerifyOtpSuccess = (response) => {
    return { type: GET_UPN_VERIFY_OTP_SUCCESS, response }
}

export const getUpnVerifyOtpFail = (response) => {
    return { type: GET_UPN_VERIFY_OTP_FAIL, response }
}

export const getUpnVerifyOtpAlert = (response) => {
    return { type: GET_UPN_VERIFY_OTP_ALERT, response }
}
export const getUpnResetState = (response) => {
    return { type: GTE_UPN_RESET_STATE, response }
}