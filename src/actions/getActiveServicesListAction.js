export const GET_ACTIVE_SERVICES_LIST = 'GET_ACTIVE_SERVICES_LIST'
export const GET_ACTIVE_SERVICES_LIST_SUCCESS = 'GET_ACTIVE_SERVICES_LIST_SUCCESS'
export const GET_ACTIVE_SERVICES_LIST_ALERT = 'GET_ACTIVE_SERVICES_LIST_ALERT'
export const GET_ACTIVE_SERVICES_LIST_FAIL = 'GET_ACTIVE_SERVICES_LIST_FAIL'
export const GET_ACTIVE_SERVICES_LIST_RESET_STATE = 'GET_ACTIVE_SERVICES_LIST_RESET_STATE'


export const getActiveServicesList = (params) => {
    return { type: GET_ACTIVE_SERVICES_LIST, params }
}

export const getActiveServicesListSuccess = (response) => {
    return { type: GET_ACTIVE_SERVICES_LIST_SUCCESS, response }
}

export const getActiveServicesListAlert = (response) => {
    return { type: GET_ACTIVE_SERVICES_LIST_ALERT, response }
}

export const getActiveServicesListFail = (response) => {
    return { type: GET_ACTIVE_SERVICES_LIST_FAIL, response }
}

export const getActiveServicesListResetState = () => {
    return { type: GET_ACTIVE_SERVICES_LIST_RESET_STATE }
}
