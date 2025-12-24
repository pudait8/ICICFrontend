export const SAVE_GPA = 'SAVE_GPA'
export const SAVE_GPA_SUCCESS = 'SAVE_GPA_SUCCESS'
export const SAVE_GPA_ALERT = 'SAVE_GPA_ALERT'
export const SAVE_GPA_FAIL = 'SAVE_GPA_FAIL'
export const SAVE_GPA_RESET_STATE = 'SAVE_GPA_RESET_STATE'


export const saveGpa = (params) => {
    return { type: SAVE_GPA, params }
}

export const saveGpaSuccess = (response) => {
    return { type: SAVE_GPA_SUCCESS, response }
}

export const saveGpaAlert = (response) => {
    return { type: SAVE_GPA_ALERT, response }
}

export const saveGpaFail = (response) => {
    return { type: SAVE_GPA_FAIL, response }
}

export const saveGpaResetState = () => {
    return { type: SAVE_GPA_RESET_STATE }
}
