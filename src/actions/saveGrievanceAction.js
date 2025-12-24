export const SAVE_GRIEVANCE = 'SAVE_GRIEVANCE'
export const SAVE_GRIEVANCE_SUCCESS = 'SAVE_GRIEVANCE_SUCCESS'
export const SAVE_GRIEVANCE_ALERT = 'SAVE_GRIEVANCE_ALERT'
export const SAVE_GRIEVANCE_FAIL = 'SAVE_GRIEVANCE_FAIL'
export const SAVE_GRIEVANCE_RESET_STATE = 'SAVE_GRIEVANCE_RESET_STATE'


export const saveGrievance = (params) => {
    return { type: SAVE_GRIEVANCE, params }
}

export const saveGrievanceSuccess = (response) => {
    return { type: SAVE_GRIEVANCE_SUCCESS, response }
}

export const saveGrievanceAlert = (response) => {
    return { type: SAVE_GRIEVANCE_ALERT, response }
}

export const saveGrievanceFail = (response) => {
    return { type: SAVE_GRIEVANCE_FAIL, response }
}

export const saveGrievanceResetState = () => {
    return { type: SAVE_GRIEVANCE_RESET_STATE }
}
