export const GET_GRIEVANCE_DEPT_LIST = 'GET_GRIEVANCE_DEPT_LIST'
export const GET_GRIEVANCE_DEPT_LIST_SUCCESS = 'GET_GRIEVANCE_DEPT_LIST_SUCCESS'
export const GET_GRIEVANCE_DEPT_LIST_ALERT = 'GET_GRIEVANCE_DEPT_LIST_ALERT'
export const GET_GRIEVANCE_DEPT_LIST_FAIL = 'GET_GRIEVANCE_DEPT_LIST_FAIL'
export const GET_GRIEVANCE_DEPT_LIST_RESET_STATE = 'GET_GRIEVANCE_DEPT_LIST_RESET_STATE'


export const getGrievanceDeptList = (params) => {
    return { type: GET_GRIEVANCE_DEPT_LIST, params }
}

export const getGrievanceDeptListSuccess = (response) => {
    return { type: GET_GRIEVANCE_DEPT_LIST_SUCCESS, response }
}

export const getGrievanceDeptListAlert = (response) => {
    return { type: GET_GRIEVANCE_DEPT_LIST_ALERT, response }
}

export const getGrievanceDeptListFail = (response) => {
    return { type: GET_GRIEVANCE_DEPT_LIST_FAIL, response }
}

export const getGrievanceDeptListResetState = () => {
    return { type: GET_GRIEVANCE_DEPT_LIST_RESET_STATE }
}
