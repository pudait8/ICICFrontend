export const VERIFY_PAN_SUBMIT_OTP = 'VERIFY_PAN_SUBMIT_OTP'
export const VERIFY_PAN_SUBMIT_OTP_SUCCESS = 'VERIFY_PAN_SUBMIT_OTP_SUCCESS'
export const VERIFY_PAN_SUBMIT_OTP_ALERT = 'VERIFY_PAN_SUBMIT_OTP_ALERT'
export const VERIFY_PAN_SUBMIT_OTP_FAIL = 'VERIFY_PAN_SUBMIT_OTP_FAIL'
export const VERIFY_PAN_SUBMIT_OTP_RESET_STATE = 'VERIFY_PAN_SUBMIT_OTP_RESET_STATE'


export const verifyPanSubmitOtp = (params) => {
    return { type: VERIFY_PAN_SUBMIT_OTP, params }
}

export const verifyPanSubmitOtpSuccess = (response) => {
    return { type: VERIFY_PAN_SUBMIT_OTP_SUCCESS, response }
}

export const verifyPanSubmitOtpAlert = (response) => {
    return { type: VERIFY_PAN_SUBMIT_OTP_ALERT, response }
}

export const verifyPanSubmitOtpFail = (response) => {
    return { type: VERIFY_PAN_SUBMIT_OTP_FAIL, response }
}

export const verifyPanSubmitOtpResetState = () => {
    return { type: VERIFY_PAN_SUBMIT_OTP_RESET_STATE }
}
