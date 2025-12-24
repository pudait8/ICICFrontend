export const SAVE_ECLU_LAND_DETAILS = 'SAVE_ECLU_LAND_DETAILS'
export const SAVE_ECLU_LAND_DETAILS_SUCCESS = 'SAVE_ECLU_LAND_DETAILS_SUCCESS'
export const SAVE_ECLU_LAND_DETAILS_ALERT = 'SAVE_ECLU_LAND_DETAILS_ALERT'
export const SAVE_ECLU_LAND_DETAILS_FAIL = 'SAVE_ECLU_LAND_DETAILS_FAIL'
export const SAVE_ECLU_LAND_DETAILS_RESET_STATE = 'SAVE_ECLU_LAND_DETAILS_RESET_STATE'


export const saveEcluLandDetails = (params) => {
    return { type: SAVE_ECLU_LAND_DETAILS, params }
}

export const saveEcluLandDetailsSuccess = (response) => {
    return { type: SAVE_ECLU_LAND_DETAILS_SUCCESS, response }
}

export const saveEcluLandDetailsAlert = (response) => {
    return { type: SAVE_ECLU_LAND_DETAILS_ALERT, response }
}

export const saveEcluLandDetailsFail = (response) => {
    return { type: SAVE_ECLU_LAND_DETAILS_FAIL, response }
}

export const saveEcluLandDetailsResetState = () => {
    return { type: SAVE_ECLU_LAND_DETAILS_RESET_STATE }
}
