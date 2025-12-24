export const TO_GET_PRIVATE_PROPERTIES_LIST = 'TO_GET_PRIVATE_PROPERTIES_LIST'
export const TO_GET_PRIVATE_PROPERTIES_LIST_SUCCESS = 'TO_GET_PRIVATE_PROPERTIES_LIST_SUCCESS'
export const TO_GET_PRIVATE_PROPERTIES_LIST_ALERT = 'TO_GET_PRIVATE_PROPERTIES_LIST_ALERT'
export const TO_GET_PRIVATE_PROPERTIES_LIST_FAIL = 'TO_GET_PRIVATE_PROPERTIES_LIST_FAIL'
export const TO_GET_PRIVATE_PROPERTIES_LIST_RESET_STATE = 'TO_GET_PRIVATE_PROPERTIES_LIST_RESET_STATE'

export const toGetPrivatePropertiesList = (params) => {
    return { type: TO_GET_PRIVATE_PROPERTIES_LIST, params }
}

export const toGetPrivatePropertiesListSuccess = (response) => {
    return { type: TO_GET_PRIVATE_PROPERTIES_LIST_SUCCESS, response }
}

export const toGetPrivatePropertiesListAlert = (response) => {
    return { type: TO_GET_PRIVATE_PROPERTIES_LIST_ALERT, response }
}

export const toGetPrivatePropertiesListFail = (response) => {
    return { type: TO_GET_PRIVATE_PROPERTIES_LIST_FAIL, response }
}
export const toGetPrivatePropertiesListResetState = () => {
    // console.log("toGetPrivatePropertiesListResetState");
    return { type: TO_GET_PRIVATE_PROPERTIES_LIST_RESET_STATE }
}