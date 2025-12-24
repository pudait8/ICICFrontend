export const CITIZEN_SIGNUP_RESEND_OTP = 'CITIZEN_SIGNUP_RESEND_OTP'
export const CITIZEN_SIGNUP_RESEND_OTP_SUCCESS = 'CITIZEN_SIGNUP_RESEND_OTP_SUCCESS'
export const CITIZEN_SIGNUP_RESEND_OTP_ALERT = 'CITIZEN_SIGNUP_RESEND_OTP_ALERT'
export const CITIZEN_SIGNUP_RESEND_OTP_FAIL = 'CITIZEN_SIGNUP_RESEND_OTP_FAIL'
export const CITIZEN_SIGNUP_RESEND_OTP_RESET_STATE = 'CITIZEN_SIGNUP_RESEND_OTP_RESET_STATE'

export const citizenSignupResendOtp = (params) => {
    return { type: CITIZEN_SIGNUP_RESEND_OTP, params }
}

export const citizenSignupResendOtpSuccess = (response) => {
    return { type: CITIZEN_SIGNUP_RESEND_OTP_SUCCESS, response }
}

export const citizenSignupResendOtpAlert = (response) => {
    return { type: CITIZEN_SIGNUP_RESEND_OTP_ALERT, response }
}

export const citizenSignupResendOtpFail = (response) => {
    return { type: CITIZEN_SIGNUP_RESEND_OTP_FAIL, response }
}

export const citizenSignupResendOtpResetState = () => {
    return { type: CITIZEN_SIGNUP_RESEND_OTP_RESET_STATE }
}
