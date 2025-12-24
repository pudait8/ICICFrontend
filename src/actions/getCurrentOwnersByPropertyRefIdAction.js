export const GET_CURRENT_OWNERS_BY_PROPERTY_REF_ID = 'GET_CURRENT_OWNERS_BY_PROPERTY_REF_ID'
export const GET_CURRENT_OWNERS_BY_PROPERTY_REF_ID_SUCCESS = 'GET_CURRENT_OWNERS_BY_PROPERTY_REF_ID_SUCCESS'
export const GET_CURRENT_OWNERS_BY_PROPERTY_REF_ID_ALERT = 'GET_CURRENT_OWNERS_BY_PROPERTY_REF_ID_ALERT'
export const GET_CURRENT_OWNERS_BY_PROPERTY_REF_ID_FAIL = 'GET_CURRENT_OWNERS_BY_PROPERTY_REF_ID_FAIL'
export const GET_CURRENT_OWNERS_BY_PROPERTY_REF_ID_RESET_STATE = 'GET_CURRENT_OWNERS_BY_PROPERTY_REF_ID_RESET_STATE'


export const getCurrentOwnersByPropertyRefId = (params) => {
    return { type: GET_CURRENT_OWNERS_BY_PROPERTY_REF_ID, params }
}

export const getCurrentOwnersByPropertyRefIdSuccess = (response) => {
    return { type: GET_CURRENT_OWNERS_BY_PROPERTY_REF_ID_SUCCESS, response }
}

export const getCurrentOwnersByPropertyRefIdAlert = (response) => {
    return { type: GET_CURRENT_OWNERS_BY_PROPERTY_REF_ID_ALERT, response }
}

export const getCurrentOwnersByPropertyRefIdFail = (response) => {
    return { type: GET_CURRENT_OWNERS_BY_PROPERTY_REF_ID_FAIL, response }
}

export const getCurrentOwnersByPropertyRefIdResetState = () => {
    return { type: GET_CURRENT_OWNERS_BY_PROPERTY_REF_ID_RESET_STATE }
}
