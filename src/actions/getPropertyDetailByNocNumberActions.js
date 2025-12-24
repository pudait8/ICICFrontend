export const GET_PROPERTY_DETAIL_BY_NOC_NUMBER = 'GET_PROPERTY_DETAIL_BY_NOC_NUMBER'
export const GET_PROPERTY_DETAIL_BY_NOC_NUMBER_SUCCESS = 'GET_PROPERTY_DETAIL_BY_NOC_NUMBER_SUCCESS'
export const GET_PROPERTY_DETAIL_BY_NOC_NUMBER_ALERT = 'GET_PROPERTY_DETAIL_BY_NOC_NUMBER_ALERT'
export const GET_PROPERTY_DETAIL_BY_NOC_NUMBER_FAIL = 'GET_PROPERTY_DETAIL_BY_NOC_NUMBER_FAIL'
export const GET_PROPERTY_DETAIL_BY_NOC_NUMBER_RESET_STATE = 'GET_PROPERTY_DETAIL_BY_NOC_NUMBER_RESET_STATE'


export const getPropertyDetailByNocNumber = (params) => {
    return { type: GET_PROPERTY_DETAIL_BY_NOC_NUMBER, params }
}

export const getPropertyDetailByNocNumberSuccess = (response) => {
    return { type: GET_PROPERTY_DETAIL_BY_NOC_NUMBER_SUCCESS, response }
}

export const getPropertyDetailByNocNumberAlert = (response) => {
    return { type: GET_PROPERTY_DETAIL_BY_NOC_NUMBER_ALERT, response }
}

export const getPropertyDetailByNocNumberFail = (response) => {
    return { type: GET_PROPERTY_DETAIL_BY_NOC_NUMBER_FAIL, response }
}

export const getPropertyDetailByNocNumberResetState = () => {
    return { type: GET_PROPERTY_DETAIL_BY_NOC_NUMBER_RESET_STATE }
}