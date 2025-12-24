export const GET_APPL_LIST_BY_MOBILE_NO = 'GET_APPL_LIST_BY_MOBILE_NO'
export const GET_APPL_LIST_BY_MOBILE_NO_SUCCESS = 'GET_APPL_LIST_BY_MOBILE_NO_SUCCESS'
export const GET_APPL_LIST_BY_MOBILE_NO_ALERT = 'GET_APPL_LIST_BY_MOBILE_NO_ALERT'
export const GET_APPL_LIST_BY_MOBILE_NO_FAIL = 'GET_APPL_LIST_BY_MOBILE_NO_FAIL'
export const GET_APPL_LIST_BY_MOBILE_NO_RESET_STATE = 'GET_APPL_LIST_BY_MOBILE_NO_RESET_STATE'


export const getApplListByMobileNo = (params) => {
    return { type: GET_APPL_LIST_BY_MOBILE_NO, params }
}

export const getApplListByMobileNoSuccess = (response) => {
    return { type: GET_APPL_LIST_BY_MOBILE_NO_SUCCESS, response }
}

export const getApplListByMobileNoAlert = (response) => {
    return { type: GET_APPL_LIST_BY_MOBILE_NO_ALERT, response }
}

export const getApplListByMobileNoFail = (response) => {
    return { type: GET_APPL_LIST_BY_MOBILE_NO_FAIL, response }
}

export const getApplListByMobileNoResetState = () => {
    return { type: GET_APPL_LIST_BY_MOBILE_NO_RESET_STATE }
}
