export const GET_ENTREPRENEUR_DETAIL_BY_PAN = 'GET_ENTREPRENEUR_DETAIL_BY_PAN'
export const GET_ENTREPRENEUR_DETAIL_BY_PAN_SUCCESS = 'GET_ENTREPRENEUR_DETAIL_BY_PAN_SUCCESS'
export const GET_ENTREPRENEUR_DETAIL_BY_PAN_ALERT = 'GET_ENTREPRENEUR_DETAIL_BY_PAN_ALERT'
export const GET_ENTREPRENEUR_DETAIL_BY_PAN_FAIL = 'GET_ENTREPRENEUR_DETAIL_BY_PAN_FAIL'
export const GET_ENTREPRENEUR_DETAIL_BY_PAN_RESET_STATE = 'GET_ENTREPRENEUR_DETAIL_BY_PAN_RESET_STATE'


export const getEntrepreneurDetailByPan = (params) => {
    return { type: GET_ENTREPRENEUR_DETAIL_BY_PAN, params }
}

export const getEntrepreneurDetailByPanSuccess = (response) => {
    return { type: GET_ENTREPRENEUR_DETAIL_BY_PAN_SUCCESS, response }
}

export const getEntrepreneurDetailByPanAlert = (response) => {
    return { type: GET_ENTREPRENEUR_DETAIL_BY_PAN_ALERT, response }
}

export const getEntrepreneurDetailByPanFail = (response) => {
    return { type: GET_ENTREPRENEUR_DETAIL_BY_PAN_FAIL, response }
}

export const getEntrepreneurDetailByPanResetState = () => {
    return { type: GET_ENTREPRENEUR_DETAIL_BY_PAN_RESET_STATE }
}
