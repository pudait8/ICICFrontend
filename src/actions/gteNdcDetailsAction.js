export const GTE_NDC_DETAILS = 'GTE_NDC_DETAILS'
export const GTE_NDC_DETAILS_SUCCESS = 'GTE_NDC_DETAILS_SUCCESS'
export const GTE_NDC_DETAILS_ALERT = 'GTE_NDC_DETAILS_ALERT'
export const GTE_NDC_DETAILS_FAIL = 'GTE_NDC_DETAILS_FAIL'
export const GTE_NDC_DETAILS_RESET_STATE = 'GTE_NDC_DETAILS_RESET_STATE'


export const gteNdcDetails = (params) => {
    return { type: GTE_NDC_DETAILS, params }
}

export const gteNdcDetailsSuccess = (response) => {
    return { type: GTE_NDC_DETAILS_SUCCESS, response }
}

export const gteNdcDetailsAlert = (response) => {
    return { type: GTE_NDC_DETAILS_ALERT, response }
}

export const gteNdcDetailsFail = (response) => {
    return { type: GTE_NDC_DETAILS_FAIL, response }
}

export const gteNdcDetailsResetState = () => {
    return { type: GTE_NDC_DETAILS_RESET_STATE }
}
