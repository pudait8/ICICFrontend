export const GET_PROPERTY_BASIC_DETAIL = 'GET_PROPERTY_BASIC_DETAIL'
export const GET_PROPERTY_BASIC_DETAIL_SUCCESS = 'GET_PROPERTY_BASIC_DETAIL_SUCCESS'
export const GET_PROPERTY_BASIC_DETAIL_ALERT = 'GET_PROPERTY_BASIC_DETAIL_ALERT'
export const GET_PROPERTY_BASIC_DETAIL_FAIL = 'GET_PROPERTY_BASIC_DETAIL_FAIL'
export const RESET_STATE_GET_PROPERTY_BASIC_DETAIL = 'RESET_STATE_GET_PROPERTY_BASIC_DETAIL'

export const getPropertyBasicDetail = (params) => {
    return { type: GET_PROPERTY_BASIC_DETAIL, params }
}

export const getPropertyBasicDetailSuccess = (response) => {
    return { type: GET_PROPERTY_BASIC_DETAIL_SUCCESS, response }
}

export const getPropertyBasicDetailAlert = (response) => {
    return { type: GET_PROPERTY_BASIC_DETAIL_ALERT, response }
}

export const getPropertyBasicDetailFail = (response) => {
    return { type: GET_PROPERTY_BASIC_DETAIL_FAIL, response }
}

export const resetStateGetPropertyBasicDetail = () => {
    return { type: RESET_STATE_GET_PROPERTY_BASIC_DETAIL }
}

