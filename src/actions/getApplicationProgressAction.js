export const GET_APPLICATION_PROGRESS = 'GET_APPLICATION_PROGRESS'
export const GET_APPLICATION_PROGRESS_SUCCESS = 'GET_APPLICATION_PROGRESS_SUCCESS'
export const GET_APPLICATION_PROGRESS_ALERT = 'GET_APPLICATION_PROGRESS_ALERT'
export const GET_APPLICATION_PROGRESS_FAIL = 'GET_APPLICATION_PROGRESS_FAIL'

export const getApplicationProgress = (params) => {
    return { type: GET_APPLICATION_PROGRESS, params }
}

export const getApplicationProgressSuccess = (response) => {
    return { type: GET_APPLICATION_PROGRESS_SUCCESS, response }
}

export const getApplicationProgressAlert = (response) => {
    return { type: GET_APPLICATION_PROGRESS_ALERT, response }
}

export const getApplicationProgressFail = (response) => {
    return { type: GET_APPLICATION_PROGRESS_FAIL, response }
}