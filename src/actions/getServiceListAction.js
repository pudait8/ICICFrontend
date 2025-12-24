export const GET_SERVICE_LIST = 'GET_SERVICE_LIST'
export const GET_SERVICE_LIST_SUCCESS = 'GET_SERVICE_LIST_SUCCESS'
export const GET_SERVICE_LIST_ALERT = 'GET_SERVICE_LIST_ALERT'
export const GET_SERVICE_LIST_FAIL = 'GET_SERVICE_LIST_FAIL'
export const GET_SERVICE_LIST_RESET_STATE = 'GET_SERVICE_LIST_RESET_STATE'


export const getServiceList = (params) => {
    return { type: GET_SERVICE_LIST, params }
}

export const getServiceListSuccess = (response) => {
    return { type: GET_SERVICE_LIST_SUCCESS, response }
}

export const getServiceListAlert = (response) => {
    return { type: GET_SERVICE_LIST_ALERT, response }
}

export const getServiceListFail = (response) => {
    return { type: GET_SERVICE_LIST_FAIL, response }
}

export const getServiceListResetState = () => {
    return { type: GET_SERVICE_LIST_RESET_STATE }
}
