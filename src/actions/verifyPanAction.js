export const VERIFY_PAN = 'VERIFY_PAN'
export const VERIFY_PAN_SUCCESS = 'VERIFY_PAN_SUCCESS'
export const VERIFY_PAN_ALERT = 'VERIFY_PAN_ALERT'
export const VERIFY_PAN_FAIL = 'VERIFY_PAN_FAIL'
export const VERIFY_PAN_RESET_STATE = 'VERIFY_PAN_RESET_STATE'

export const verifyPan = (params) => {
    return { type: VERIFY_PAN, params }
}

export const verifyPanSuccess = (response) => {
    return { type: VERIFY_PAN_SUCCESS, response }
}

export const verifyPanAlert = (response) => {
    return { type: VERIFY_PAN_ALERT, response }
}

export const verifyPanFail = (response) => {
    return { type: VERIFY_PAN_FAIL, response }
}

export const verifyPanResetState = () => {
    return { type: VERIFY_PAN_RESET_STATE }
}
