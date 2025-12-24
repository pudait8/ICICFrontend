export const VERIFY_UPN_AND_MOBILE_SUBMIT_OTP = 'VERIFY_UPN_AND_MOBILE_SUBMIT_OTP'
export const VERIFY_UPN_AND_MOBILE_SUBMIT_OTP_SUCCESS = 'VERIFY_UPN_AND_MOBILE_SUBMIT_OTP_SUCCESS'
export const VERIFY_UPN_AND_MOBILE_SUBMIT_OTP_ALERT = 'VERIFY_UPN_AND_MOBILE_SUBMIT_OTP_ALERT'
export const VERIFY_UPN_AND_MOBILE_SUBMIT_OTP_FAIL = 'VERIFY_UPN_AND_MOBILE_SUBMIT_OTP_FAIL'
export const VERIFY_UPN_AND_MOBILE_SUBMIT_OTP_RESET_STATE = 'VERIFY_UPN_AND_MOBILE_SUBMIT_OTP_RESET_STATE'


export const verifyUpnAndMobileSubmitOtp = (params) => {
    return { type: VERIFY_UPN_AND_MOBILE_SUBMIT_OTP, params }
}

export const verifyUpnAndMobileSubmitOtpSuccess = (response) => {
    return { type: VERIFY_UPN_AND_MOBILE_SUBMIT_OTP_SUCCESS, response }
}

export const verifyUpnAndMobileSubmitOtpAlert = (response) => {
    return { type: VERIFY_UPN_AND_MOBILE_SUBMIT_OTP_ALERT, response }
}

export const verifyUpnAndMobileSubmitOtpFail = (response) => {
    return { type: VERIFY_UPN_AND_MOBILE_SUBMIT_OTP_FAIL, response }
}

export const verifyUpnAndMobileSubmitOtpResetState = () => {
    return { type: VERIFY_UPN_AND_MOBILE_SUBMIT_OTP_RESET_STATE }
}
