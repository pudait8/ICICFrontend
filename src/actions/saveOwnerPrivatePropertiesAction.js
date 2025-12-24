export const SAVE_OWNER_PRIVATE_PROPERTIES = 'SAVE_OWNER_PRIVATE_PROPERTIES'
export const SAVE_OWNER_PRIVATE_PROPERTIES_SUCCESS = 'SAVE_OWNER_PRIVATE_PROPERTIES_SUCCESS'
export const SAVE_OWNER_PRIVATE_PROPERTIES_ALERT = 'SAVE_OWNER_PRIVATE_PROPERTIES_ALERT'
export const SAVE_OWNER_PRIVATE_PROPERTIES_FAIL = 'SAVE_OWNER_PRIVATE_PROPERTIES_FAIL'
export const SAVE_OWNER_PRIVATE_PROPERTIES_RESET_STATE = 'SAVE_OWNER_PRIVATE_PROPERTIES_RESET_STATE'

export const saveOwnerPrivateProperties = (params) => {
    return { type: SAVE_OWNER_PRIVATE_PROPERTIES, params }
}

export const saveOwnerPrivatePropertiesSuccess = (response) => {
    return { type: SAVE_OWNER_PRIVATE_PROPERTIES_SUCCESS, response }
}

export const saveOwnerPrivatePropertiesAlert = (response) => {
    return { type: SAVE_OWNER_PRIVATE_PROPERTIES_ALERT, response }
}

export const saveOwnerPrivatePropertiesFail = (response) => {
    return { type: SAVE_OWNER_PRIVATE_PROPERTIES_FAIL, response }
}
export const saveOwnerPrivatePropertiesResetState = () => {
    return { type: SAVE_OWNER_PRIVATE_PROPERTIES_RESET_STATE }
}