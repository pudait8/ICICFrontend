export const FORGOT_PASSWORD_SEND_OTP = 'FORGOT_PASSWORD_SEND_OTP'
export const FORGOT_PASSWORD_SEND_OTP_SUCCESS = 'FORGOT_PASSWORD_SEND_OTP_SUCCESS'
export const FORGOT_PASSWORD_SEND_OTP_ALERT = 'FORGOT_PASSWORD_SEND_OTP_ALERT'
export const FORGOT_PASSWORD_SEND_OTP_FAIL = 'FORGOT_PASSWORD_SEND_OTP_FAIL'
export const FORGOT_PASSWORD_SEND_OTP_RESET_STATE = 'FORGOT_PASSWORD_SEND_OTP_RESET_STATE'

export const forgotPasswordSendOtp = (params) => {
    return { type: FORGOT_PASSWORD_SEND_OTP, params }
}

export const forgotPasswordSendOtpSuccess = (response) => {
    return { type: FORGOT_PASSWORD_SEND_OTP_SUCCESS, response }
}

export const forgotPasswordSendOtpAlert = (response) => {
    return { type: FORGOT_PASSWORD_SEND_OTP_ALERT, response }
}

export const forgotPasswordSendOtpFail = (response) => {
    return { type: FORGOT_PASSWORD_SEND_OTP_FAIL, response }
}

export const forgotPasswordSendOtpResetState = () => {
    return { type: FORGOT_PASSWORD_SEND_OTP_RESET_STATE }
}
