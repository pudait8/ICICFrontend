export const GET_ARCHITECT_DASHBOARD = 'GET_ARCHITECT_DASHBOARD'
export const GET_ARCHITECT_DASHBOARD_SUCCESS = 'GET_ARCHITECT_DASHBOARD_SUCCESS'
export const GET_ARCHITECT_DASHBOARD_ALERT = 'GET_ARCHITECT_DASHBOARD_ALERT'
export const GET_ARCHITECT_DASHBOARD_FAIL = 'GET_ARCHITECT_DASHBOARD_FAIL'
export const GET_ARCHITECT_DASHBOARD_RESET_STATE = 'GET_ARCHITECT_DASHBOARD_RESET_STATE'

export const getArchitectDashboard = (params) => {
    return { type: GET_ARCHITECT_DASHBOARD, params }
}

export const getArchitectDashboardSuccess = (response) => {
    return { type: GET_ARCHITECT_DASHBOARD_SUCCESS, response }
}

export const getArchitectDashboardAlert = (response) => {
    return { type: GET_ARCHITECT_DASHBOARD_ALERT, response }
}

export const getArchitectDashboardFail = (response) => {
    return { type: GET_ARCHITECT_DASHBOARD_FAIL, response }
}

export const getArchitectDashboardResetState = () => {
    return { type: GET_ARCHITECT_DASHBOARD_RESET_STATE }
}
