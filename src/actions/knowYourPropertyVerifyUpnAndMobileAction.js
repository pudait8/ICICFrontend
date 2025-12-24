export const KNOW_YOUR_PROPERTY_VERIFY_UPN_AND_MOBILE = 'KNOW_YOUR_PROPERTY_VERIFY_UPN_AND_MOBILE'
export const KNOW_YOUR_PROPERTY_VERIFY_UPN_AND_MOBILE_SUCCESS = 'KNOW_YOUR_PROPERTY_VERIFY_UPN_AND_MOBILE_SUCCESS'
export const KNOW_YOUR_PROPERTY_VERIFY_UPN_AND_MOBILE_ALERT = 'KNOW_YOUR_PROPERTY_VERIFY_UPN_AND_MOBILE_ALERT'
export const KNOW_YOUR_PROPERTY_VERIFY_UPN_AND_MOBILE_FAIL = 'KNOW_YOUR_PROPERTY_VERIFY_UPN_AND_MOBILE_FAIL'
export const KNOW_YOUR_PROPERTY_VERIFY_UPN_AND_MOBILE_RESET_STATE = 'KNOW_YOUR_PROPERTY_VERIFY_UPN_AND_MOBILE_RESET_STATE'


export const knowYourPropertyVerifyUpnAndMobile = (params) => {
    return { type: KNOW_YOUR_PROPERTY_VERIFY_UPN_AND_MOBILE, params }
}

export const knowYourPropertyVerifyUpnAndMobileSuccess = (response) => {
    return { type: KNOW_YOUR_PROPERTY_VERIFY_UPN_AND_MOBILE_SUCCESS, response }
}

export const knowYourPropertyVerifyUpnAndMobileAlert = (response) => {
    return { type: KNOW_YOUR_PROPERTY_VERIFY_UPN_AND_MOBILE_ALERT, response }
}

export const knowYourPropertyVerifyUpnAndMobileFail = (response) => {
    return { type: KNOW_YOUR_PROPERTY_VERIFY_UPN_AND_MOBILE_FAIL, response }
}

export const knowYourPropertyVerifyUpnAndMobileResetState = () => {
    return { type: KNOW_YOUR_PROPERTY_VERIFY_UPN_AND_MOBILE_RESET_STATE }
}
