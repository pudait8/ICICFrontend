export const RE_SUBMIT_FOR_SCRUTINY = 'RE_SUBMIT_FOR_SCRUTINY'
export const RE_SUBMIT_FOR_SCRUTINY_SUCCESS = 'RE_SUBMIT_FOR_SCRUTINY_SUCCESS'
export const RE_SUBMIT_FOR_SCRUTINY_ALERT = 'RE_SUBMIT_FOR_SCRUTINY_ALERT'
export const RE_SUBMIT_FOR_SCRUTINY_FAIL = 'RE_SUBMIT_FOR_SCRUTINY_FAIL'
export const RE_SUBMIT_FOR_SCRUTINY_RESET_STATE = 'RE_SUBMIT_FOR_SCRUTINY_RESET_STATE'


export const reSubmitForScrutiny = (params) => {
    return { type: RE_SUBMIT_FOR_SCRUTINY, params }
}

export const reSubmitForScrutinySuccess = (response) => {
    return { type: RE_SUBMIT_FOR_SCRUTINY_SUCCESS, response }
}

export const reSubmitForScrutinyAlert = (response) => {
    return { type: RE_SUBMIT_FOR_SCRUTINY_ALERT, response }
}

export const reSubmitForScrutinyFail = (response) => {
    return { type: RE_SUBMIT_FOR_SCRUTINY_FAIL, response }
}

export const reSubmitForScrutinyResetState = () => {
    return { type: RE_SUBMIT_FOR_SCRUTINY_RESET_STATE }
}
