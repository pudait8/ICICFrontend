export const SAVE_ECLU_PROJECT_DETAILS = 'SAVE_ECLU_PROJECT_DETAILS'
export const SAVE_ECLU_PROJECT_DETAILS_SUCCESS = 'SAVE_ECLU_PROJECT_DETAILS_SUCCESS'
export const SAVE_ECLU_PROJECT_DETAILS_ALERT = 'SAVE_ECLU_PROJECT_DETAILS_ALERT'
export const SAVE_ECLU_PROJECT_DETAILS_FAIL = 'SAVE_ECLU_PROJECT_DETAILS_FAIL'
export const SAVE_ECLU_PROJECT_DETAILS_RESET_STATE = 'SAVE_ECLU_PROJECT_DETAILS_RESET_STATE'


export const saveEcluProjectDetails = (params) => {
    return { type: SAVE_ECLU_PROJECT_DETAILS, params }
}

export const saveEcluProjectDetailsSuccess = (response) => {
    return { type: SAVE_ECLU_PROJECT_DETAILS_SUCCESS, response }
}

export const saveEcluProjectDetailsAlert = (response) => {
    return { type: SAVE_ECLU_PROJECT_DETAILS_ALERT, response }
}

export const saveEcluProjectDetailsFail = (response) => {
    return { type: SAVE_ECLU_PROJECT_DETAILS_FAIL, response }
}

export const saveEcluProjectDetailsResetState = () => {
    return { type: SAVE_ECLU_PROJECT_DETAILS_RESET_STATE }
}
