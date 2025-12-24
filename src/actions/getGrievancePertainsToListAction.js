export const GET_GRIEVANCE_PERTAINS_TO_LIST = 'GET_GRIEVANCE_PERTAINS_TO_LIST'
export const GET_GRIEVANCE_PERTAINS_TO_LIST_SUCCESS = 'GET_GRIEVANCE_PERTAINS_TO_LIST_SUCCESS'
export const GET_GRIEVANCE_PERTAINS_TO_LIST_ALERT = 'GET_GRIEVANCE_PERTAINS_TO_LIST_ALERT'
export const GET_GRIEVANCE_PERTAINS_TO_LIST_FAIL = 'GET_GRIEVANCE_PERTAINS_TO_LIST_FAIL'
export const GET_GRIEVANCE_PERTAINS_TO_LIST_RESET_STATE = 'GET_GRIEVANCE_PERTAINS_TO_LIST_RESET_STATE'


export const getGrievancePertainsToList = (params) => {
    return { type: GET_GRIEVANCE_PERTAINS_TO_LIST, params }
}

export const getGrievancePertainsToListSuccess = (response) => {
    return { type: GET_GRIEVANCE_PERTAINS_TO_LIST_SUCCESS, response }
}

export const getGrievancePertainsToListAlert = (response) => {
    return { type: GET_GRIEVANCE_PERTAINS_TO_LIST_ALERT, response }
}

export const getGrievancePertainsToListFail = (response) => {
    return { type: GET_GRIEVANCE_PERTAINS_TO_LIST_FAIL, response }
}

export const getGrievancePertainsToListResetState = () => {
    return { type: GET_GRIEVANCE_PERTAINS_TO_LIST_RESET_STATE }
}
