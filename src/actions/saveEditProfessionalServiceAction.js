export const SAVE_EDIT_PROFESSIONAL_SERVICE = 'SAVE_EDIT_PROFESSIONAL_SERVICE'
export const SAVE_EDIT_PROFESSIONAL_SERVICE_SUCCESS = 'SAVE_EDIT_PROFESSIONAL_SERVICE_SUCCESS'
export const SAVE_EDIT_PROFESSIONAL_SERVICE_ALERT = 'SAVE_EDIT_PROFESSIONAL_SERVICE_ALERT'
export const SAVE_EDIT_PROFESSIONAL_SERVICE_FAIL = 'SAVE_EDIT_PROFESSIONAL_SERVICE_FAIL'
export const SAVE_EDIT_PROFESSIONAL_SERVICE_RESET_STATE = 'SAVE_EDIT_PROFESSIONAL_SERVICE_RESET_STATE'


export const saveEditProfessionalService = (params) => {
    return { type: SAVE_EDIT_PROFESSIONAL_SERVICE, params }
}

export const saveEditProfessionalServiceSuccess = (response) => {
    return { type: SAVE_EDIT_PROFESSIONAL_SERVICE_SUCCESS, response }
}

export const saveEditProfessionalServiceAlert = (response) => {
    return { type: SAVE_EDIT_PROFESSIONAL_SERVICE_ALERT, response }
}

export const saveEditProfessionalServiceFail = (response) => {
    return { type: SAVE_EDIT_PROFESSIONAL_SERVICE_FAIL, response }
}

export const saveEditProfessionalServiceResetState = () => {
    return { type: SAVE_EDIT_PROFESSIONAL_SERVICE_RESET_STATE }
}
