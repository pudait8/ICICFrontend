export const CITIZEN_SIGNUP = 'CITIZEN_SIGNUP'
export const CITIZEN_SIGNUP_SUCCESS = 'CITIZEN_SIGNUP_SUCCESS'
export const CITIZEN_SIGNUP_ALERT = 'CITIZEN_SIGNUP_ALERT'
export const CITIZEN_SIGNUP_FAIL = 'CITIZEN_SIGNUP_FAIL'
export const CITIZEN_SIGNUP_RESET_STATE = 'CITIZEN_SIGNUP_RESET_STATE'

export const citizenSignup = (params) => {
    return { type: CITIZEN_SIGNUP, params }
}

export const citizenSignupSuccess = (response) => {
    return { type: CITIZEN_SIGNUP_SUCCESS, response }
}

export const citizenSignupAlert = (response) => {
    return { type: CITIZEN_SIGNUP_ALERT, response }
}

export const citizenSignupFail = (response) => {
    return { type: CITIZEN_SIGNUP_FAIL, response }
}

export const citizenSignupResetState = () => {
    return { type: CITIZEN_SIGNUP_RESET_STATE }
}
