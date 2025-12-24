export const GTE_NDC_DETAILS = 'GTE_NDC_DETAILS'
export const GTE_NDC_DETAILS_SUCCESS = 'GTE_NDC_DETAILS_SUCCESS'
export const GTE_NDC_DETAILS_ALERT = 'GTE_NDC_DETAILS_ALERT'
export const GTE_NDC_DETAILS_FAIL = 'GTE_NDC_DETAILS_FAIL'
export const GTE_NDC_DETAILS_RESET_STATE = 'GTE_NDC_DETAILS_RESET_STATE'


export const getNdcDetails = (params) => {
    return { type: GTE_NDC_DETAILS, params }
}

export const getNdcDetailsSuccess = (response) => {
    return { type: GTE_NDC_DETAILS_SUCCESS, response }
}

export const getNdcDetailsAlert = (response) => {
    return { type: GTE_NDC_DETAILS_ALERT, response }
}

export const getNdcDetailsFail = (response) => {
    return { type: GTE_NDC_DETAILS_FAIL, response }
}

export const getNdcDetailsResetState = () => {
    return { type: GTE_NDC_DETAILS_RESET_STATE }
}
