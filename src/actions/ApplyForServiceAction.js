export const SAVE_APPLICATION = 'SAVE_APPLICATION'
export const SAVE_APPLICATION_SUCCESS = 'SAVE_APPLICATION_SUCCESS'
export const SAVE_APPLICATION_ALERT = 'SAVE_APPLICATION_ALERT'
export const SAVE_APPLICATION_FAIL = 'SAVE_APPLICATION_FAIL'

export const saveApplication = (params) => {
    return { type: SAVE_APPLICATION, params }
}

export const saveApplicationSuccess = (response) => {
    return { type: SAVE_APPLICATION_SUCCESS, response }
}

export const saveApplicationAlert = (response) => {
    return { type: SAVE_APPLICATION_ALERT, response }
}

export const saveApplicationFail = (response) => {
    return { type: SAVE_APPLICATION_FAIL, response }
}

