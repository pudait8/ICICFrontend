export const VERIFY_UPN_AND_MOBILE = 'VERIFY_UPN_AND_MOBILE'
export const VERIFY_UPN_AND_MOBILE_SUCCESS = 'VERIFY_UPN_AND_MOBILE_SUCCESS'
export const VERIFY_UPN_AND_MOBILE_ALERT = 'VERIFY_UPN_AND_MOBILE_ALERT'
export const VERIFY_UPN_AND_MOBILE_FAIL = 'VERIFY_UPN_AND_MOBILE_FAIL'
export const VERIFY_UPN_AND_MOBILE_RESET_STATE = 'VERIFY_UPN_AND_MOBILE_RESET_STATE'


export const verifyUpnAndMobile = (params) => {
    return { type: VERIFY_UPN_AND_MOBILE, params }
}

export const verifyUpnAndMobileSuccess = (response) => {
    return { type: VERIFY_UPN_AND_MOBILE_SUCCESS, response }
}

export const verifyUpnAndMobileAlert = (response) => {
    return { type: VERIFY_UPN_AND_MOBILE_ALERT, response }
}

export const verifyUpnAndMobileFail = (response) => {
    return { type: VERIFY_UPN_AND_MOBILE_FAIL, response }
}

export const verifyUpnAndMobileResetState = () => {
    return { type: VERIFY_UPN_AND_MOBILE_RESET_STATE }
}
