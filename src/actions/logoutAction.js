export const LOGOUT = 'LOGOUT'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_ALERT = 'LOGOUT_ALERT'
export const LOGOUT_FAIL = 'LOGOUT_FAIL'
export const LOGOUT_RESET_STATE = 'LOGOUT_RESET_STATE'


export const logout = (params) => {
    return { type: LOGOUT, params }
}

export const logoutSuccess = (response) => {
    return { type: LOGOUT_SUCCESS, response }
}

export const logoutAlert = (response) => {
    return { type: LOGOUT_ALERT, response }
}

export const logoutFail = (response) => {
    return { type: LOGOUT_FAIL, response }
}

export const logoutResetState = () => {
    return { type: LOGOUT_RESET_STATE }
}
