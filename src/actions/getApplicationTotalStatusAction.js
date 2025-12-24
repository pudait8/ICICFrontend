export const GET_APPLICATIONTOTAL_TOTAL_STATUS = 'GET_APPLICATIONTOTAL_TOTAL_STATUS'
export const GET_APPLICATIONTOTAL_TOTAL_STATUS_SUCCESS = 'GET_APPLICATIONTOTAL_TOTAL_STATUS_SUCCESS'
export const GET_APPLICATIONTOTAL_TOTAL_STATUS_ALERT = 'GET_APPLICATIONTOTAL_TOTAL_STATUS_ALERT'
export const GET_APPLICATIONTOTAL_TOTAL_STATUS_FAIL = 'GET_APPLICATIONTOTAL_TOTAL_STATUS_FAIL'
export const GET_APPLICATIONTOTAL_TOTAL_STATUS_RESET_STATE = 'GET_APPLICATIONTOTAL_TOTAL_STATUS_RESET_STATE'

export const getApplicationTotalStatus = (params) => {
    return { type: GET_APPLICATIONTOTAL_TOTAL_STATUS, params }
}

export const getApplicationTotalStatusSuccess = (response) => {
    return { type: GET_APPLICATIONTOTAL_TOTAL_STATUS_SUCCESS, response }
}

export const getApplicationTotalStatusAlert = (response) => {
    return { type: GET_APPLICATIONTOTAL_TOTAL_STATUS_ALERT, response }
}

export const getApplicationTotalStatusFail = (response) => {
    return { type: GET_APPLICATIONTOTAL_TOTAL_STATUS_FAIL, response }
}

export const getApplicationTotalStatusResetState = () => {
    return { type: GET_APPLICATIONTOTAL_TOTAL_STATUS_RESET_STATE }
}
