export const GET_AUTO_PROPERTY_HEAD_LIST = 'GET_AUTO_PROPERTY_HEAD_LIST'
export const GET_AUTO_PROPERTY_HEAD_LIST_SUCCESS = 'GET_AUTO_PROPERTY_HEAD_LIST_SUCCESS'
export const GET_AUTO_PROPERTY_HEAD_LIST_ALERT = 'GET_AUTO_PROPERTY_HEAD_LIST_ALERT'
export const GET_AUTO_PROPERTY_HEAD_LIST_FAIL = 'GET_AUTO_PROPERTY_HEAD_LIST_FAIL'
export const GET_AUTO_PROPERTY_HEAD_LIST_RESET_STATE = 'GET_AUTO_PROPERTY_HEAD_LIST_RESET_STATE'


export const getAutoPropertyHeadList = (params) => {
    return { type: GET_AUTO_PROPERTY_HEAD_LIST, params }
}

export const getAutoPropertyHeadListSuccess = (response) => {
    return { type: GET_AUTO_PROPERTY_HEAD_LIST_SUCCESS, response }
}

export const getAutoPropertyHeadListAlert = (response) => {
    return { type: GET_AUTO_PROPERTY_HEAD_LIST_ALERT, response }
}

export const getAutoPropertyHeadListFail = (response) => {
    return { type: GET_AUTO_PROPERTY_HEAD_LIST_FAIL, response }
}

export const getAutoPropertyHeadListResetState = () => {
    return { type: GET_AUTO_PROPERTY_HEAD_LIST_RESET_STATE }
}
