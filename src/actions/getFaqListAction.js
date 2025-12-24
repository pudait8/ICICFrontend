export const GET_FAQ_LIST = 'GET_FAQ_LIST'
export const GET_FAQ_LIST_SUCCESS = 'GET_FAQ_LIST_SUCCESS'
export const GET_FAQ_LIST_ALERT = 'GET_FAQ_LIST_ALERT'
export const GET_FAQ_LIST_FAIL = 'GET_FAQ_LIST_FAIL'


export const getFaqList = (params) => {
    return { type: GET_FAQ_LIST, params }
}

export const getFaqListSuccess = (response) => {
    return { type: GET_FAQ_LIST_SUCCESS, response }
}

export const getFaqListAlert = (response) => {
    return { type: GET_FAQ_LIST_ALERT, response }
}

export const getFaqListFail = (response) => {
    return { type: GET_FAQ_LIST_FAIL, response }
}
