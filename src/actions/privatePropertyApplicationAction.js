export const PRIVATE_PROPERTY_APPLICATION = 'PRIVATE_PROPERTY_APPLICATION'
export const PRIVATE_PROPERTY_APPLICATION_SUCCESS = 'PRIVATE_PROPERTY_APPLICATION_SUCCESS'
export const PRIVATE_PROPERTY_APPLICATION_ALERT = 'PRIVATE_PROPERTY_APPLICATION_ALERT'
export const PRIVATE_PROPERTY_APPLICATION_FAIL = 'PRIVATE_PROPERTY_APPLICATION_FAIL'
export const PRIVATE_PROPERTY_APPLICATION_RESET_STATE = 'PRIVATE_PROPERTY_APPLICATION_RESET_STATE'

export const privatePropertyApplication = (params) => {
    return { type: PRIVATE_PROPERTY_APPLICATION, params }
}

export const privatePropertyApplicationSuccess = (response) => {
    return { type: PRIVATE_PROPERTY_APPLICATION_SUCCESS, response }
}

export const privatePropertyApplicationAlert = (response) => {
    return { type: PRIVATE_PROPERTY_APPLICATION_ALERT, response }
}

export const privatePropertyApplicationFail = (response) => {
    return { type: PRIVATE_PROPERTY_APPLICATION_FAIL, response }
}
export const privatePropertyApplicationResetState = (response) => {
    return { type: PRIVATE_PROPERTY_APPLICATION_RESET_STATE, response }
}