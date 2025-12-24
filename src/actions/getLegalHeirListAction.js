export const GET_LEGAL_HEIR_LIST = 'GET_LEGAL_HEIR_LIST'
export const GET_LEGAL_HEIR_LIST_SUCCESS = 'GET_LEGAL_HEIR_LIST_SUCCESS'
export const GET_LEGAL_HEIR_LIST_ALERT = 'GET_LEGAL_HEIR_LIST_ALERT'
export const GET_LEGAL_HEIR_LIST_FAIL = 'GET_LEGAL_HEIR_LIST_FAIL'
export const GET_LEGAL_HEIR_LIST_RESET_STATE = 'GET_LEGAL_HEIR_LIST_RESET_STATE'


export const getLegalHeirList = (params) => {
    return { type: GET_LEGAL_HEIR_LIST, params }
}

export const getLegalHeirListSuccess = (response) => {
    return { type: GET_LEGAL_HEIR_LIST_SUCCESS, response }
}

export const getLegalHeirListAlert = (response) => {
    return { type: GET_LEGAL_HEIR_LIST_ALERT, response }
}

export const getLegalHeirListFail = (response) => {
    return { type: GET_LEGAL_HEIR_LIST_FAIL, response }
}

export const getLegalHeirListResetState = () => {
    return { type: GET_LEGAL_HEIR_LIST_RESET_STATE }
}
