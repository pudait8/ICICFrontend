export const SAVE_NDC_APPLICATION = 'SAVE_NDC_APPLICATION'
export const SAVE_NDC_APPLICATION_SUCCESS = 'SAVE_NDC_APPLICATION_SUCCESS'
export const SAVE_NDC_APPLICATION_ALERT = 'SAVE_NDC_APPLICATION_ALERT'
export const SAVE_NDC_APPLICATION_FAIL = 'SAVE_NDC_APPLICATION_FAIL'
export const SAVE_NDC_APPLICATION_RESET_STATE = 'SAVE_NDC_APPLICATION_RESET_STATE'


export const saveNdcApplication = (params) => {
    return { type: SAVE_NDC_APPLICATION, params }
}

export const saveNdcApplicationSuccess = (response) => {
    return { type: SAVE_NDC_APPLICATION_SUCCESS, response }
}

export const saveNdcApplicationAlert = (response) => {
    return { type: SAVE_NDC_APPLICATION_ALERT, response }
}

export const saveNdcApplicationFail = (response) => {
    return { type: SAVE_NDC_APPLICATION_FAIL, response }
}

export const saveNdcApplicationResetState = () => {
    return { type: SAVE_NDC_APPLICATION_RESET_STATE }
}
