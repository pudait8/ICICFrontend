export const DELETE_GPA = 'DELETE_GPA'
export const DELETE_GPA_SUCCESS = 'DELETE_GPA_SUCCESS'
export const DELETE_GPA_ALERT = 'DELETE_GPA_ALERT'
export const DELETE_GPA_FAIL = 'DELETE_GPA_FAIL'
export const DELETE_GPA_RESET_STATE = 'DELETE_GPA_RESET_STATE'


export const deleteGpa = (params) => {
    return { type: DELETE_GPA, params }
}

export const deleteGpaSuccess = (response) => {
    return { type: DELETE_GPA_SUCCESS, response }
}

export const deleteGpaAlert = (response) => {
    return { type: DELETE_GPA_ALERT, response }
}

export const deleteGpaFail = (response) => {
    return { type: DELETE_GPA_FAIL, response }
}
export const deleteGpaResetState = () => {
    return { type: DELETE_GPA_RESET_STATE }
}