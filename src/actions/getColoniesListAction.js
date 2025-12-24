export const GET_COLONIES_LIST = 'GET_COLONIES_LIST'
export const GET_COLONIES_LIST_SUCCESS = 'GET_COLONIES_LIST_SUCCESS'
export const GET_COLONIES_LIST_ALERT = 'GET_COLONIES_LIST_ALERT'
export const GET_COLONIES_LIST_FAIL = 'GET_COLONIES_LIST_FAIL'
export const GET_COLONIES_LIST_RESET_STATE = 'GET_COLONIES_LIST_RESET_STATE'


export const getColoniesList = (params) => {
    return { type: GET_COLONIES_LIST, params }
}

export const getColoniesListSuccess = (response) => {
    return { type: GET_COLONIES_LIST_SUCCESS, response }
}

export const getColoniesListAlert = (response) => {
    return { type: GET_COLONIES_LIST_ALERT, response }
}

export const getColoniesListFail = (response) => {
    return { type: GET_COLONIES_LIST_FAIL, response }
}

export const getColoniesListResetState = () => {
    return { type: GET_COLONIES_LIST_RESET_STATE }
}
