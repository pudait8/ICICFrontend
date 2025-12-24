export const CITIZEN_SIGNUP_VERIFY_OTP = 'CITIZEN_SIGNUP_VERIFY_OTP'
export const CITIZEN_SIGNUP_VERIFY_OTP_SUCCESS = 'CITIZEN_SIGNUP_VERIFY_OTP_SUCCESS'
export const CITIZEN_SIGNUP_VERIFY_OTP_ALERT = 'CITIZEN_SIGNUP_VERIFY_OTP_ALERT'
export const CITIZEN_SIGNUP_VERIFY_OTP_FAIL = 'CITIZEN_SIGNUP_VERIFY_OTP_FAIL'
export const CITIZEN_SIGNUP_VERIFY_OTP_RESET_STATE = 'CITIZEN_SIGNUP_VERIFY_OTP_RESET_STATE'

export const citizenSignupVerifyOtp = (params) => {
    return { type: CITIZEN_SIGNUP_VERIFY_OTP, params }
}

export const citizenSignupVerifyOtpSuccess = (response) => {
    return { type: CITIZEN_SIGNUP_VERIFY_OTP_SUCCESS, response }
}

export const citizenSignupVerifyOtpAlert = (response) => {
    return { type: CITIZEN_SIGNUP_VERIFY_OTP_ALERT, response }
}

export const citizenSignupVerifyOtpFail = (response) => {
    return { type: CITIZEN_SIGNUP_VERIFY_OTP_FAIL, response }
}

export const citizenSignupVerifyOtpResetState = () => {
    return { type: CITIZEN_SIGNUP_VERIFY_OTP_RESET_STATE }
}
