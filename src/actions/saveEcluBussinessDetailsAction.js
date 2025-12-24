export const SAVE_ECLU_BUSSINESS_DETAILS = 'SAVE_ECLU_BUSSINESS_DETAILS'
export const SAVE_ECLU_BUSSINESS_DETAILS_SUCCESS = 'SAVE_ECLU_BUSSINESS_DETAILS_SUCCESS'
export const SAVE_ECLU_BUSSINESS_DETAILS_ALERT = 'SAVE_ECLU_BUSSINESS_DETAILS_ALERT'
export const SAVE_ECLU_BUSSINESS_DETAILS_FAIL = 'SAVE_ECLU_BUSSINESS_DETAILS_FAIL'
export const SAVE_ECLU_BUSSINESS_DETAILS_RESET_STATE = 'SAVE_ECLU_BUSSINESS_DETAILS_RESET_STATE'


export const saveEcluBussinessDetails = (params) => {
    return { type: SAVE_ECLU_BUSSINESS_DETAILS, params }
}

export const saveEcluBussinessDetailsSuccess = (response) => {
    return { type: SAVE_ECLU_BUSSINESS_DETAILS_SUCCESS, response }
}

export const saveEcluBussinessDetailsAlert = (response) => {
    return { type: SAVE_ECLU_BUSSINESS_DETAILS_ALERT, response }
}

export const saveEcluBussinessDetailsFail = (response) => {
    return { type: SAVE_ECLU_BUSSINESS_DETAILS_FAIL, response }
}

export const saveEcluBussinessDetailsResetState = () => {
    return { type: SAVE_ECLU_BUSSINESS_DETAILS_RESET_STATE }
}
