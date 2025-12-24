export const SAVE_PERMITTING_PROFESSIONAL_SERVICE = 'SAVE_PERMITTING_PROFESSIONAL_SERVICE'
export const SAVE_PERMITTING_PROFESSIONAL_SERVICE_SUCCESS = 'SAVE_PERMITTING_PROFESSIONAL_SERVICE_SUCCESS'
export const SAVE_PERMITTING_PROFESSIONAL_SERVICE_ALERT = 'SAVE_PERMITTING_PROFESSIONAL_SERVICE_ALERT'
export const SAVE_PERMITTING_PROFESSIONAL_SERVICE_FAIL = 'SAVE_PERMITTING_PROFESSIONAL_SERVICE_FAIL'
export const SAVE_PERMITTING_PROFESSIONAL_SERVICE_RESET_STATE = 'SAVE_PERMITTING_PROFESSIONAL_SERVICE_RESET_STATE'


export const savePermittingProfessionalService = (params) => {
    return { type: SAVE_PERMITTING_PROFESSIONAL_SERVICE, params }
}

export const savePermittingProfessionalServiceSuccess = (response) => {
    return { type: SAVE_PERMITTING_PROFESSIONAL_SERVICE_SUCCESS, response }
}

export const savePermittingProfessionalServiceAlert = (response) => {
    return { type: SAVE_PERMITTING_PROFESSIONAL_SERVICE_ALERT, response }
}

export const savePermittingProfessionalServiceFail = (response) => {
    return { type: SAVE_PERMITTING_PROFESSIONAL_SERVICE_FAIL, response }
}

export const savePermittingProfessionalServiceResetState = () => {
    return { type: SAVE_PERMITTING_PROFESSIONAL_SERVICE_RESET_STATE }
}
