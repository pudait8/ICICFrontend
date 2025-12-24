export const TO_GET_PRIVATE_SCHEME = 'TO_GET_PRIVATE_SCHEME'
export const TO_GET_PRIVATE_SCHEME_SUCCESS = 'TO_GET_PRIVATE_SCHEME_SUCCESS'
export const TO_GET_PRIVATE_SCHEME_ALERT = 'TO_GET_PRIVATE_SCHEME_ALERT'
export const TO_GET_PRIVATE_SCHEME_FAIL = 'TO_GET_PRIVATE_SCHEME_FAIL'
export const TO_GET_PRIVATE_SCHEME_RESET_STATE = 'TO_GET_PRIVATE_SCHEME_RESET_STATE'

export const toGetPrivateScheme = (params) => {
    return { type: TO_GET_PRIVATE_SCHEME, params }
}

export const toGetPrivateSchemeSuccess = (response) => {
    return { type: TO_GET_PRIVATE_SCHEME_SUCCESS, response }
}

export const toGetPrivateSchemeAlert = (response) => {
    return { type: TO_GET_PRIVATE_SCHEME_ALERT, response }
}

export const toGetPrivateSchemeFail = (response) => {
    return { type: TO_GET_PRIVATE_SCHEME_FAIL, response }
}
export const toGetPrivateSchemeResetState = (response) => {
    return { type: TO_GET_PRIVATE_SCHEME_RESET_STATE, response }
}