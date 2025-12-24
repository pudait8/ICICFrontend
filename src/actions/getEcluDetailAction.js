export const GET_ECLU_DETAIL = 'GET_ECLU_DETAIL'
export const GET_ECLU_DETAIL_SUCCESS = 'GET_ECLU_DETAIL_SUCCESS'
export const GET_ECLU_DETAIL_ALERT = 'GET_ECLU_DETAIL_ALERT'
export const GET_ECLU_DETAIL_FAIL = 'GET_ECLU_DETAIL_FAIL'
export const GET_ECLU_DETAIL_RESET_STATE = 'GET_ECLU_DETAIL_RESET_STATE'

export const getEcluDetail = (params) => {
    return { type: GET_ECLU_DETAIL, params }
}

export const getEcluDetailSuccess = (response) => {
    return { type: GET_ECLU_DETAIL_SUCCESS, response }
}

export const getEcluDetailResetState = (response) => {
    return { type: GET_ECLU_DETAIL_RESET_STATE }
}

export const getEcluDetailAlert = (response) => {
    return { type: GET_ECLU_DETAIL_ALERT, response }
}

export const getEcluDetailFail = (response) => {
    return { type: GET_ECLU_DETAIL_FAIL, response }
}