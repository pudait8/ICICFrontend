export const ARCHITECT_LOGIN = 'ARCHITECT_LOGIN'
export const ARCHITECT_LOGIN_SUCCESS = 'ARCHITECT_LOGIN_SUCCESS'
export const ARCHITECT_LOGIN_ALERT = 'ARCHITECT_LOGIN_ALERT'
export const ARCHITECT_LOGIN_FAIL = 'ARCHITECT_LOGIN_FAIL'
export const ARCHITECT_LOGIN_RESET_STATE = 'ARCHITECT_LOGIN_RESET_STATE'

export const architectLogin = (params) => {
    return { type: ARCHITECT_LOGIN, params }
}

export const architectLoginSuccess = (response) => {
    return { type: ARCHITECT_LOGIN_SUCCESS, response }
}

export const architectLoginAlert = (response) => {
    return { type: ARCHITECT_LOGIN_ALERT, response }
}

export const architectLoginFail = (response) => {
    return { type: ARCHITECT_LOGIN_FAIL, response }
}

export const architectLoginResetState = () => {
    return { type: ARCHITECT_LOGIN_RESET_STATE }
}
