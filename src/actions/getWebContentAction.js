export const GET_WEB_CONTENT = 'GET_WEB_CONTENT'
export const GET_WEB_CONTENT_SUCCESS = 'GET_WEB_CONTENT_SUCCESS'
export const GET_WEB_CONTENT_ALERT = 'GET_WEB_CONTENT_ALERT'
export const GET_WEB_CONTENT_FAIL = 'GET_WEB_CONTENT_FAIL'
export const GET_WEB_CONTENT_RESET_STATE = 'GET_WEB_CONTENT_RESET_STATE'


export const getWebContent = (params) => {
    return { type: GET_WEB_CONTENT, params }
}

export const getWebContentSuccess = (response) => {
    return { type: GET_WEB_CONTENT_SUCCESS, response }
}

export const getWebContentAlert = (response) => {
    return { type: GET_WEB_CONTENT_ALERT, response }
}

export const getWebContentFail = (response) => {
    return { type: GET_WEB_CONTENT_FAIL, response }
}

export const getWebContentResetState = () => {
    return { type: GET_WEB_CONTENT_RESET_STATE }
}
