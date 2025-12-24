export const GET_GRIEVANCE_DESG_LIST = 'GET_GRIEVANCE_DESG_LIST'
export const GET_GRIEVANCE_DESG_LIST_SUCCESS = 'GET_GRIEVANCE_DESG_LIST_SUCCESS'
export const GET_GRIEVANCE_DESG_LIST_ALERT = 'GET_GRIEVANCE_DESG_LIST_ALERT'
export const GET_GRIEVANCE_DESG_LIST_FAIL = 'GET_GRIEVANCE_DESG_LIST_FAIL'
export const GET_GRIEVANCE_DESG_LIST_RESET_STATE = 'GET_GRIEVANCE_DESG_LIST_RESET_STATE'


export const getGrievanceDesgList = (params) => {
    return { type: GET_GRIEVANCE_DESG_LIST, params }
}

export const getGrievanceDesgListSuccess = (response) => {
    return { type: GET_GRIEVANCE_DESG_LIST_SUCCESS, response }
}

export const getGrievanceDesgListAlert = (response) => {
    return { type: GET_GRIEVANCE_DESG_LIST_ALERT, response }
}

export const getGrievanceDesgListFail = (response) => {
    return { type: GET_GRIEVANCE_DESG_LIST_FAIL, response }
}

export const getGrievanceDesgListResetState = () => {
    return { type: GET_GRIEVANCE_DESG_LIST_RESET_STATE }
}
