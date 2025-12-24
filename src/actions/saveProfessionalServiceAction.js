export const SAVE_PROFESSIONAL_SERVICE = 'SAVE_PROFESSIONAL_SERVICE'
export const SAVE_PROFESSIONAL_SERVICE_SUCCESS = 'SAVE_PROFESSIONAL_SERVICE_SUCCESS'
export const SAVE_PROFESSIONAL_SERVICE_ALERT = 'SAVE_PROFESSIONAL_SERVICE_ALERT'
export const SAVE_PROFESSIONAL_SERVICE_FAIL = 'SAVE_PROFESSIONAL_SERVICE_FAIL'
export const SAVE_PROFESSIONAL_SERVICE_RESET_STATE = 'SAVE_PROFESSIONAL_SERVICE_RESET_STATE'


export const saveProfessionalService = (params) => {
    return { type: SAVE_PROFESSIONAL_SERVICE, params }
}

export const saveProfessionalServiceSuccess = (response) => {
    return { type: SAVE_PROFESSIONAL_SERVICE_SUCCESS, response }
}

export const saveProfessionalServiceAlert = (response) => {
    return { type: SAVE_PROFESSIONAL_SERVICE_ALERT, response }
}

export const saveProfessionalServiceFail = (response) => {
    return { type: SAVE_PROFESSIONAL_SERVICE_FAIL, response }
}

export const saveProfessionalServiceResetState = () => {
    return { type: SAVE_PROFESSIONAL_SERVICE_RESET_STATE }
}
