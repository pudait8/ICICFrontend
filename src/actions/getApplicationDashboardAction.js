export const GET_APPLICATION_DASHBOARD = 'GET_APPLICATION_DASHBOARD'
export const GET_APPLICATION_DASHBOARD_SUCCESS = 'GET_APPLICATION_DASHBOARD_SUCCESS'
export const GET_APPLICATION_DASHBOARD_ALERT = 'GET_APPLICATION_DASHBOARD_ALERT'
export const GET_APPLICATION_DASHBOARD_FAIL = 'GET_APPLICATION_DASHBOARD_FAIL'
export const GET_APPLICATION_DASHBOARD_RESET_STATE = 'GET_APPLICATION_DASHBOARD_RESET_STATE'


export const getApplicationDashboard = (params) => {
    return { type: GET_APPLICATION_DASHBOARD, params }
}

export const getApplicationDashboardSuccess = (response) => {
    return { type: GET_APPLICATION_DASHBOARD_SUCCESS, response }
}

export const getApplicationDashboardAlert = (response) => {
    return { type: GET_APPLICATION_DASHBOARD_ALERT, response }
}

export const getApplicationDashboardFail = (response) => {
    return { type: GET_APPLICATION_DASHBOARD_FAIL, response }
}

export const getApplicationDashboardResetState = () => {
    return { type: GET_APPLICATION_DASHBOARD_RESET_STATE }
}
