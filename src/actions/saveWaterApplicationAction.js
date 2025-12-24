export const SAVE_WATER_APPLICATION = 'SAVE_WATER_APPLICATION'
export const SAVE_WATER_APPLICATION_SUCCESS = 'SAVE_WATER_APPLICATION_SUCCESS'
export const SAVE_WATER_APPLICATION_ALERT = 'SAVE_WATER_APPLICATION_ALERT'
export const SAVE_WATER_APPLICATION_FAIL = 'SAVE_WATER_APPLICATION_FAIL'
export const SAVE_WATER_APPLICATION_RESET_STATE = 'SAVE_WATER_APPLICATION_RESET_STATE'


export const saveWaterApplication = (params) => {
    return { type: SAVE_WATER_APPLICATION, params }
}

export const saveWaterApplicationSuccess = (response) => {
    return { type: SAVE_WATER_APPLICATION_SUCCESS, response }
}

export const saveWaterApplicationAlert = (response) => {
    return { type: SAVE_WATER_APPLICATION_ALERT, response }
}

export const saveWaterApplicationFail = (response) => {
    return { type: SAVE_WATER_APPLICATION_FAIL, response }
}

export const saveWaterApplicationResetState = () => {
    return { type: SAVE_WATER_APPLICATION_RESET_STATE }
}
