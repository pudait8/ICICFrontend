export const GET_ACT_LIST = 'GET_ACT_LIST'
export const GET_ACT_LIST_SUCCESS = 'GET_ACT_LIST_SUCCESS'
export const GET_ACT_LIST_ALERT = 'GET_ACT_LIST_ALERT'
export const GET_ACT_LIST_FAIL = 'GET_ACT_LIST_FAIL'


export const getActList = (params) => {
    return { type: GET_ACT_LIST, params }
}

export const getActListSuccess = (response) => {
    return { type: GET_ACT_LIST_SUCCESS, response }
}

export const getActListAlert = (response) => {
    return { type: GET_ACT_LIST_ALERT, response }
}

export const getActListFail = (response) => {
    return { type: GET_ACT_LIST_FAIL, response }
}
