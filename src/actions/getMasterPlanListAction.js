export const GET_MASTER_PLAN_LIST = 'GET_MASTER_PLAN_LIST'
export const GET_MASTER_PLAN_LIST_SUCCESS = 'GET_MASTER_PLAN_LIST_SUCCESS'
export const GET_MASTER_PLAN_LIST_ALERT = 'GET_MASTER_PLAN_LIST_ALERT'
export const GET_MASTER_PLAN_LIST_FAIL = 'GET_MASTER_PLAN_LIST_FAIL'


export const getMasterPlanList = (params) => {
    return { type: GET_MASTER_PLAN_LIST, params }
}

export const getMasterPlanListSuccess = (response) => {
    return { type: GET_MASTER_PLAN_LIST_SUCCESS, response }
}

export const getMasterPlanListAlert = (response) => {
    return { type: GET_MASTER_PLAN_LIST_ALERT, response }
}

export const getMasterPlanListFail = (response) => {
    return { type: GET_MASTER_PLAN_LIST_FAIL, response }
}
