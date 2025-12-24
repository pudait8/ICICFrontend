export const GET_OWNER_LIST = 'GET_OWNER_LIST'
export const GET_OWNER_LIST_SUCCESS = 'GET_OWNER_LIST_SUCCESS'
export const GET_OWNER_LIST_ALERT = 'GET_OWNER_LIST_ALERT'
export const GET_OWNER_LIST_FAIL = 'GET_OWNER_LIST_FAIL'
export const GET_OWNER_LIST_RESET_STATE = 'GET_OWNER_LIST_RESET_STATE'


export const getOwnerList = (params) => {
    return { type: GET_OWNER_LIST, params }
}

export const getOwnerListSuccess = (response) => {
    return { type: GET_OWNER_LIST_SUCCESS, response }
}

export const getOwnerListAlert = (response) => {
    return { type: GET_OWNER_LIST_ALERT, response }
}

export const getOwnerListFail = (response) => {
    return { type: GET_OWNER_LIST_FAIL, response }
}

export const getOwnerListResetState = () => {
    return { type: GET_OWNER_LIST_RESET_STATE }
}
