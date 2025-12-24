export const SET_NEW_PASSWORD = 'SET_NEW_PASSWORD'
export const SET_NEW_PASSWORD_SUCCESS = 'SET_NEW_PASSWORD_SUCCESS'
export const SET_NEW_PASSWORD_ALERT = 'SET_NEW_PASSWORD_ALERT'
export const SET_NEW_PASSWORD_FAIL = 'SET_NEW_PASSWORD_FAIL'
export const SET_NEW_PASSWORD_RESET_STATE = 'SET_NEW_PASSWORD_RESET_STATE'

export const SET_AUTH_TRANSACTION_NUMBER = 'SET_AUTH_TRANSACTION_NUMBER'

export const setNewPassword = (params) => {
    return { type: SET_NEW_PASSWORD, params }
}

export const setNewPasswordSuccess = (response) => {
    return { type: SET_NEW_PASSWORD_SUCCESS, response }
}

export const setNewPasswordAlert = (response) => {
    return { type: SET_NEW_PASSWORD_ALERT, response }
}

export const setNewPasswordFail = (response) => {
    return { type: SET_NEW_PASSWORD_FAIL, response }
}

export const setNewPasswordResetState = () => {
    return { type: SET_NEW_PASSWORD_RESET_STATE }
}


export const setAuthTransactionNumber = (AuthTransactionNumber) => {
    return { type: SET_AUTH_TRANSACTION_NUMBER, AuthTransactionNumber }
}