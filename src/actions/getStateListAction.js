export const GET_STATE_LIST = 'GET_STATE_LIST'
export const GET_STATE_LIST_SUCCESS = 'GET_STATE_LIST_SUCCESS'
export const GET_STATE_LIST_ALERT = 'GET_STATE_LIST_ALERT'
export const GET_STATE_LIST_FAIL = 'GET_STATE_LIST_FAIL'
export const GET_STATE_LIST_RESET_STATE = 'GET_STATE_LIST_RESET_STATE'


export const getStateList = (params) => {
    return { type: GET_STATE_LIST, params }
}

export const getStateListSuccess = (response) => {
    return { type: GET_STATE_LIST_SUCCESS, response }
}

export const getStateListAlert = (response) => {
    return { type: GET_STATE_LIST_ALERT, response }
}

export const getStateListFail = (response) => {
    return { type: GET_STATE_LIST_FAIL, response }
}

export const getStateListResetState = () => {
    return { type: GET_STATE_LIST_RESET_STATE }
}
