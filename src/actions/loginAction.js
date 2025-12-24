export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ALERT = 'LOGIN_ALERT'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const LOGIN_RESET_STATE = 'LOGIN_RESET_STATE'
export const LOGIN_RESET_LOGGED_IN = 'LOGIN_RESET_LOGGED_IN'

export const login = (params) => {
    return { type: LOGIN, params }
}

export const loginSuccess = (response) => {
    return { type: LOGIN_SUCCESS, response }
}

export const loginAlert = (response) => {
    return { type: LOGIN_ALERT, response }
}

export const loginFail = (response) => {
    return { type: LOGIN_FAIL, response }
}

export const loginResetState = () => {
    return { type: LOGIN_RESET_STATE }
}

export const loginResetLoggedIn = () => {
    return { type: LOGIN_RESET_LOGGED_IN }
}
