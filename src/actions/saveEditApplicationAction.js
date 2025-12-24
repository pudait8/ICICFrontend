export const SAVE_EDIT_APPLICATION = 'SAVE_EDIT_APPLICATION'
export const SAVE_EDIT_APPLICATION_SUCCESS = 'SAVE_EDIT_APPLICATION_SUCCESS'
export const SAVE_EDIT_APPLICATION_ALERT = 'SAVE_EDIT_APPLICATION_ALERT'
export const SAVE_EDIT_APPLICATION_FAIL = 'SAVE_EDIT_APPLICATION_FAIL'
export const SAVE_EDIT_APPLICATION_RESET_STATE = 'SAVE_EDIT_APPLICATION_RESET_STATE'


export const saveEditApplication = (params) => {
    return { type: SAVE_EDIT_APPLICATION, params }
}

export const saveEditApplicationSuccess = (response) => {
    return { type: SAVE_EDIT_APPLICATION_SUCCESS, response }
}

export const saveEditApplicationAlert = (response) => {
    return { type: SAVE_EDIT_APPLICATION_ALERT, response }
}

export const saveEditApplicationFail = (response) => {
    return { type: SAVE_EDIT_APPLICATION_FAIL, response }
}

export const saveEditApplicationResetState = () => {
    return { type: SAVE_EDIT_APPLICATION_RESET_STATE }
}
