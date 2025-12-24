export const GET_PURCHASER_LIST = 'GET_PURCHASER_LIST'
export const GET_PURCHASER_LIST_SUCCESS = 'GET_PURCHASER_LIST_SUCCESS'
export const GET_PURCHASER_LIST_ALERT = 'GET_PURCHASER_LIST_ALERT'
export const GET_PURCHASER_LIST_FAIL = 'GET_PURCHASER_LIST_FAIL'
export const GET_PURCHASER_LIST_RESET_STATE = 'GET_PURCHASER_LIST_RESET_STATE'


export const getPurchaserList = (params) => {
    return { type: GET_PURCHASER_LIST, params }
}

export const getPurchaserListSuccess = (response) => {
    return { type: GET_PURCHASER_LIST_SUCCESS, response }
}

export const getPurchaserListAlert = (response) => {
    return { type: GET_PURCHASER_LIST_ALERT, response }
}

export const getPurchaserListFail = (response) => {
    return { type: GET_PURCHASER_LIST_FAIL, response }
}

export const getPurchaserListResetState = () => {
    return { type: GET_PURCHASER_LIST_RESET_STATE }
}
