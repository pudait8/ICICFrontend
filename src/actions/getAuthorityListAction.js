export const GET_AUTHORITY_LIST = 'GET_AUTHORITY_LIST'
export const GET_AUTHORITY_LIST_SUCCESS = 'GET_AUTHORITY_LIST_SUCCESS'
export const GET_AUTHORITY_LIST_ALERT = 'GET_AUTHORITY_LIST_ALERT'
export const GET_AUTHORITY_LIST_FAIL = 'GET_AUTHORITY_LIST_FAIL'
export const GET_AUTHORITY_LIST_RESET_STATE = 'GET_AUTHORITY_LIST_RESET_STATE'

export const getAuthorityList = (params) => {
    return { type: GET_AUTHORITY_LIST, params }
}

export const getAuthorityListSuccess = (response) => {
    return { type: GET_AUTHORITY_LIST_SUCCESS, response }
}

export const getAuthorityListAlert = (response) => {
    return { type: GET_AUTHORITY_LIST_ALERT, response }
}

export const getAuthorityListFail = (response) => {
    return { type: GET_AUTHORITY_LIST_FAIL, response }
}

export const getAuthorityListResetState = () => {
    return { type: GET_AUTHORITY_LIST_RESET_STATE }
}
