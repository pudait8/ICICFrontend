export const GET_DISTRICT_LIST = 'GET_DISTRICT_LIST'
export const GET_DISTRICT_LIST_SUCCESS = 'GET_DISTRICT_LIST_SUCCESS'
export const GET_DISTRICT_LIST_ALERT = 'GET_DISTRICT_LIST_ALERT'
export const GET_DISTRICT_LIST_FAIL = 'GET_DISTRICT_LIST_FAIL'
export const GET_DISTRICT_LIST_RESET_STATE = 'GET_DISTRICT_LIST_RESET_STATE'


export const getDistrictList = (params) => {
    return { type: GET_DISTRICT_LIST, params }
}

export const getDistrictListSuccess = (response) => {
    return { type: GET_DISTRICT_LIST_SUCCESS, response }
}

export const getDistrictListAlert = (response) => {
    return { type: GET_DISTRICT_LIST_ALERT, response }
}

export const getDistrictListFail = (response) => {
    return { type: GET_DISTRICT_LIST_FAIL, response }
}

export const getDistrictListResetState = () => {
    return { type: GET_DISTRICT_LIST_RESET_STATE }
}
