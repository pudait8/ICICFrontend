export const VIEW_EDIT_APPLICATION = 'VIEW_EDIT_APPLICATION'
export const VIEW_EDIT_APPLICATION_SUCCESS = 'VIEW_EDIT_APPLICATION_SUCCESS'
export const VIEW_EDIT_APPLICATION_ALERT = 'VIEW_EDIT_APPLICATION_ALERT'
export const VIEW_EDIT_APPLICATION_FAIL = 'VIEW_EDIT_APPLICATION_FAIL'
export const VIEW_EDIT_APPLICATION_RESET_STATE = 'VIEW_EDIT_APPLICATION_RESET_STATE'


export const viewEditApplication = (params) => {
    return { type: VIEW_EDIT_APPLICATION, params }
}

export const viewEditApplicationSuccess = (response) => {
    return { type: VIEW_EDIT_APPLICATION_SUCCESS, response }
}

export const viewEditApplicationAlert = (response) => {
    return { type: VIEW_EDIT_APPLICATION_ALERT, response }
}

export const viewEditApplicationFail = (response) => {
    return { type: VIEW_EDIT_APPLICATION_FAIL, response }
}

export const viewEditApplicationResetState = () => {
    return { type: VIEW_EDIT_APPLICATION_RESET_STATE }
}
