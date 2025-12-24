export const GET_REGISTRATION_CATEGORY = 'GET_REGISTRATION_CATEGORY'
export const GET_REGISTRATION_CATEGORY_SUCCESS = 'GET_REGISTRATION_CATEGORY_SUCCESS'
export const GET_REGISTRATION_CATEGORY_ALERT = 'GET_REGISTRATION_CATEGORY_ALERT'
export const GET_REGISTRATION_CATEGORY_FAIL = 'GET_REGISTRATION_CATEGORY_FAIL'
export const GET_REGISTRATION_CATEGORY_RESET_STATE = 'GET_REGISTRATION_CATEGORY_RESET_STATE'


export const getRegistrationCategory = (params) => {
    return { type: GET_REGISTRATION_CATEGORY, params }
}

export const getRegistrationCategorySuccess = (response) => {
    return { type: GET_REGISTRATION_CATEGORY_SUCCESS, response }
}

export const getRegistrationCategoryAlert = (response) => {
    return { type: GET_REGISTRATION_CATEGORY_ALERT, response }
}

export const getRegistrationCategoryFail = (response) => {
    return { type: GET_REGISTRATION_CATEGORY_FAIL, response }
}

export const getRegistrationCategoryResetState = (response) => {
    return { type: GET_REGISTRATION_CATEGORY_RESET_STATE, response }
}

