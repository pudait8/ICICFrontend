export const GET_APPLICATION_DETAIL = 'GET_APPLICATION_DETAIL'
export const GET_APPLICATION_DETAIL_SUCCESS = 'GET_APPLICATION_DETAIL_SUCCESS'
export const GET_APPLICATION_DETAIL_ALERT = 'GET_APPLICATION_DETAIL_ALERT'
export const GET_APPLICATION_DETAIL_FAIL = 'GET_APPLICATION_DETAIL_FAIL'

export const getApplicationDetail = (params) => {
    return { type: GET_APPLICATION_DETAIL, params }
}

export const getApplicationDetailSuccess = (response) => {
    return { type: GET_APPLICATION_DETAIL_SUCCESS, response }
}

export const getApplicationDetailAlert = (response) => {
    return { type: GET_APPLICATION_DETAIL_ALERT, response }
}

export const getApplicationDetailFail = (response) => {
    return { type: GET_APPLICATION_DETAIL_FAIL, response }
}