export const GET_ZONING_DETAILS = 'GET_ZONING_DETAILS'
export const GET_ZONING_DETAILS_SUCCESS = 'GET_ZONING_DETAILS_SUCCESS'
export const GET_ZONING_DETAILS_ALERT = 'GET_ZONING_DETAILS_ALERT'
export const GET_ZONING_DETAILS_FAIL = 'GET_ZONING_DETAILS_FAIL'
export const GET_ZONING_DETAILS_RESET_STATE = 'GET_ZONING_DETAILS_RESET_STATE'

export const getZoningDetail = (params) => {
    return { type: GET_ZONING_DETAILS, params }
}

export const getZoningDetailSuccess = (response) => {
    return { type: GET_ZONING_DETAILS_SUCCESS, response }
}

export const getZoningDetailAlert = (response) => {
    return { type: GET_ZONING_DETAILS_ALERT, response }
}

export const getZoningDetailFail = (response) => {
    return { type: GET_ZONING_DETAILS_FAIL, response }
}

export const getZoningDetailResetState = () => {
    return { type: GET_ZONING_DETAILS_RESET_STATE }
}
