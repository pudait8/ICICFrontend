export const GET_PROPERTY_AREA_UNIT = 'GET_PROPERTY_AREA_UNIT'
export const GET_PROPERTY_AREA_UNIT_SUCCESS = 'GET_PROPERTY_AREA_UNIT_SUCCESS'
export const GET_PROPERTY_AREA_UNIT_ALERT = 'GET_PROPERTY_AREA_UNIT_ALERT'
export const GET_PROPERTY_AREA_UNIT_FAIL = 'GET_PROPERTY_AREA_UNIT_FAIL'
export const RESET_STATE_GET_PROPERTY_AREA_UNIT = 'RESET_STATE_GET_PROPERTY_AREA_UNIT'

export const getPropertyAreaUnitList = (params) => {
    return { type: GET_PROPERTY_AREA_UNIT, params }
}

export const getPropertyAreaUnitListSuccess = (response) => {
    return { type: GET_PROPERTY_AREA_UNIT_SUCCESS, response }
}

export const getPropertyAreaUnitListAlert = (response) => {
    return { type: GET_PROPERTY_AREA_UNIT_ALERT, response }
}

export const getPropertyAreaUnitListFail = (response) => {
    return { type: GET_PROPERTY_AREA_UNIT_FAIL, response }
}

export const resetStateGetPropertyAreaUnitList = () => {
    return { type: RESET_STATE_GET_PROPERTY_AREA_UNIT }
}

