export const SAVE_ECLU_APPLICANT = 'SAVE_ECLU_APPLICANT'
export const SAVE_ECLU_APPLICANT_SUCCESS = 'SAVE_ECLU_APPLICANT_SUCCESS'
export const SAVE_ECLU_APPLICANT_ALERT = 'SAVE_ECLU_APPLICANT_ALERT'
export const SAVE_ECLU_APPLICANT_FAIL = 'SAVE_ECLU_APPLICANT_FAIL'
export const SAVE_ECLU_APPLICANT_RESET_STATE = 'SAVE_ECLU_APPLICANT_RESET_STATE'


export const saveEcluApplicant = (params) => {
    return { type: SAVE_ECLU_APPLICANT, params }
}

export const saveEcluApplicantSuccess = (response) => {
    return { type: SAVE_ECLU_APPLICANT_SUCCESS, response }
}

export const saveEcluApplicantAlert = (response) => {
    return { type: SAVE_ECLU_APPLICANT_ALERT, response }
}

export const saveEcluApplicantFail = (response) => {
    return { type: SAVE_ECLU_APPLICANT_FAIL, response }
}

export const saveEcluApplicantResetState = () => {
    return { type: SAVE_ECLU_APPLICANT_RESET_STATE }
}
