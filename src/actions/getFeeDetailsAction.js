export const GET_FEE_DETAILS = 'GET_FEE_DETAILS'
export const GET_FEE_DETAILS_SUCCESS = 'GET_FEE_DETAILS_SUCCESS'
export const GET_FEE_DETAILS_ALERT = 'GET_FEE_DETAILS_ALERT'
export const GET_FEE_DETAILS_FAIL = 'GET_FEE_DETAILS_FAIL'
export const GET_FEE_DETAILS_RESET_STATE = 'GET_FEE_DETAILS_RESET_STATE'


export const getFeeDetails = (params) => {
    return { type: GET_FEE_DETAILS, params }
}

export const getFeeDetailsSuccess = (response) => {
    return { type: GET_FEE_DETAILS_SUCCESS, response }
}

export const getFeeDetailsAlert = (response) => {
    return { type: GET_FEE_DETAILS_ALERT, response }
}

export const getFeeDetailsFail = (response) => {
    return { type: GET_FEE_DETAILS_FAIL, response }
}
export const getFeeDetailsResetState = () => {
    return { type: GET_FEE_DETAILS_RESET_STATE }
}

