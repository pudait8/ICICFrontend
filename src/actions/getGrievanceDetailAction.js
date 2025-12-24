export const GET_GRIEVANCE_DETAIL = 'GET_GRIEVANCE_DETAIL'
export const GET_GRIEVANCE_DETAIL_SUCCESS = 'GET_GRIEVANCE_DETAIL_SUCCESS'
export const GET_GRIEVANCE_DETAIL_ALERT = 'GET_GRIEVANCE_DETAIL_ALERT'
export const GET_GRIEVANCE_DETAIL_FAIL = 'GET_GRIEVANCE_DETAIL_FAIL'
export const GET_GRIEVANCE_DETAIL_RESET_STATE = 'GET_GRIEVANCE_DETAIL_RESET_STATE'

export const getGrievanceDetail = (params) => {
    return { type: GET_GRIEVANCE_DETAIL, params }
}

export const getGrievanceDetailSuccess = (response) => {
    return { type: GET_GRIEVANCE_DETAIL_SUCCESS, response }
}

export const getGrievanceDetailResetState = (response) => {
    return { type: GET_GRIEVANCE_DETAIL_RESET_STATE }
}

export const getGrievanceDetailAlert = (response) => {
    return { type: GET_GRIEVANCE_DETAIL_ALERT, response }
}

export const getGrievanceDetailFail = (response) => {
    return { type: GET_GRIEVANCE_DETAIL_FAIL, response }
}