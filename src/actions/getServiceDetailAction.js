export const GET_SERVICE_DETAIL = 'GET_SERVICE_DETAIL'
export const GET_SERVICE_DETAIL_SUCCESS = 'GET_SERVICE_DETAIL_SUCCESS'
export const GET_SERVICE_DETAIL_ALERT = 'GET_SERVICE_DETAIL_ALERT'
export const GET_SERVICE_DETAIL_FAIL = 'GET_SERVICE_DETAIL_FAIL'
export const GET_SERVICE_DETAIL_RESET_STATE = 'GET_SERVICE_DETAIL_RESET_STATE'


export const getServiceDetail = (params) => {
    return { type: GET_SERVICE_DETAIL, params }
}

export const getServiceDetailSuccess = (response) => {
    return { type: GET_SERVICE_DETAIL_SUCCESS, response }
}

export const getServiceDetailAlert = (response) => {
    return { type: GET_SERVICE_DETAIL_ALERT, response }
}

export const getServiceDetailFail = (response) => {
    return { type: GET_SERVICE_DETAIL_FAIL, response }
}

export const getServiceDetailResetState = () => {
    return { type: GET_SERVICE_DETAIL_RESET_STATE }
}
