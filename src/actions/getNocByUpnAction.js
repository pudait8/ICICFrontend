export const GET_NOC_BY_UPN = 'GET_NOC_BY_UPN'
export const GET_NOC_BY_UPN_SUCCESS = 'GET_NOC_BY_UPN_SUCCESS'
export const GET_NOC_BY_UPN_ALERT = 'GET_NOC_BY_UPN_ALERT'
export const GET_NOC_BY_UPN_FAIL = 'GET_NOC_BY_UPN_FAIL'
export const GET_NOC_BY_UPN_RESET_STATE = 'GET_NOC_BY_UPN_RESET_STATE'


export const getNocByUpn = (params) => {
    return { type: GET_NOC_BY_UPN, params }
}

export const getNocByUpnSuccess = (response) => {
    return { type: GET_NOC_BY_UPN_SUCCESS, response }
}

export const getNocByUpnAlert = (response) => {
    return { type: GET_NOC_BY_UPN_ALERT, response }
}

export const getNocByUpnFail = (response) => {
    return { type: GET_NOC_BY_UPN_FAIL, response }
}

export const getNocByUpnResetState = () => {
    return { type: GET_NOC_BY_UPN_RESET_STATE }
}
