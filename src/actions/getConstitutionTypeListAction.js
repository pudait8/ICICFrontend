export const GET_CONSTITUTION_TYPE_LIST = 'GET_CONSTITUTION_TYPE_LIST'
export const GET_CONSTITUTION_TYPE_LIST_SUCCESS = 'GET_CONSTITUTION_TYPE_LIST_SUCCESS'
export const GET_CONSTITUTION_TYPE_LIST_ALERT = 'GET_CONSTITUTION_TYPE_LIST_ALERT'
export const GET_CONSTITUTION_TYPE_LIST_FAIL = 'GET_CONSTITUTION_TYPE_LIST_FAIL'
export const GET_CONSTITUTION_TYPE_LIST_RESET_STATE = 'GET_CONSTITUTION_TYPE_LIST_RESET_STATE'


export const getConstitutionTypeList = (params) => {
    return { type: GET_CONSTITUTION_TYPE_LIST, params }
}

export const getConstitutionTypeListSuccess = (response) => {
    return { type: GET_CONSTITUTION_TYPE_LIST_SUCCESS, response }
}

export const getConstitutionTypeListAlert = (response) => {
    return { type: GET_CONSTITUTION_TYPE_LIST_ALERT, response }
}

export const getConstitutionTypeListFail = (response) => {
    return { type: GET_CONSTITUTION_TYPE_LIST_FAIL, response }
}
export const getConstitutionTypeListResetState = () => {
    return { type: GET_CONSTITUTION_TYPE_LIST_RESET_STATE }
}
