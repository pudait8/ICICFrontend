export const SAVE_EDIT_WATER_APPLICATION = 'SAVE_EDIT_WATER_APPLICATION'
export const SAVE_EDIT_WATER_APPLICATION_SUCCESS = 'SAVE_EDIT_WATER_APPLICATION_SUCCESS'
export const SAVE_EDIT_WATER_APPLICATION_ALERT = 'SAVE_EDIT_WATER_APPLICATION_ALERT'
export const SAVE_EDIT_WATER_APPLICATION_FAIL = 'SAVE_EDIT_WATER_APPLICATION_FAIL'
export const SAVE_EDIT_WATER_APPLICATION_RESET_STATE = 'SAVE_EDIT_WATER_APPLICATION_RESET_STATE'


export const saveEditWaterApplication = (params) => {
    return { type: SAVE_EDIT_WATER_APPLICATION, params }
}

export const saveEditWaterApplicationSuccess = (response) => {
    return { type: SAVE_EDIT_WATER_APPLICATION_SUCCESS, response }
}

export const saveEditWaterApplicationAlert = (response) => {
    return { type: SAVE_EDIT_WATER_APPLICATION_ALERT, response }
}

export const saveEditWaterApplicationFail = (response) => {
    return { type: SAVE_EDIT_WATER_APPLICATION_FAIL, response }
}

export const saveEditWaterApplicationResetState = () => {
    return { type: SAVE_EDIT_WATER_APPLICATION_RESET_STATE }
}
