export const FORGOT_PASSWORD_VALIDATE_OTP = 'FORGOT_PASSWORD_VALIDATE_OTP'
export const FORGOT_PASSWORD_VALIDATE_OTP_SUCCESS = 'FORGOT_PASSWORD_VALIDATE_OTP_SUCCESS'
export const FORGOT_PASSWORD_VALIDATE_OTP_ALERT = 'FORGOT_PASSWORD_VALIDATE_OTP_ALERT'
export const FORGOT_PASSWORD_VALIDATE_OTP_FAIL = 'FORGOT_PASSWORD_VALIDATE_OTP_FAIL'
export const FORGOT_PASSWORD_VALIDATE_OTP_RESET_STATE = 'FORGOT_PASSWORD_VALIDATE_OTP_RESET_STATE'

export const forgotPasswordValidateOtp = (params) => {
    return { type: FORGOT_PASSWORD_VALIDATE_OTP, params }
}

export const forgotPasswordValidateOtpSuccess = (response) => {
    return { type: FORGOT_PASSWORD_VALIDATE_OTP_SUCCESS, response }
}

export const forgotPasswordValidateOtpAlert = (response) => {
    return { type: FORGOT_PASSWORD_VALIDATE_OTP_ALERT, response }
}

export const forgotPasswordValidateOtpFail = (response) => {
    return { type: FORGOT_PASSWORD_VALIDATE_OTP_FAIL, response }
}

export const forgotPasswordValidateOtpResetState = () => {
    return { type: FORGOT_PASSWORD_VALIDATE_OTP_RESET_STATE }
}
