export const GET_PROPERTY_ALL_APPLICATIONS = 'GET_PROPERTY_ALL_APPLICATIONS'
export const GET_PROPERTY_ALL_APPLICATIONS_SUCCESS = 'GET_PROPERTY_ALL_APPLICATIONS_SUCCESS'
export const GET_PROPERTY_ALL_APPLICATIONS_ALERT = 'GET_PROPERTY_ALL_APPLICATIONS_ALERT'
export const GET_PROPERTY_ALL_APPLICATIONS_FAIL = 'GET_PROPERTY_ALL_APPLICATIONS_FAIL'

export const getPropertyAllApplications = (params) => {
    return { type: GET_PROPERTY_ALL_APPLICATIONS, params }
}

export const getPropertyAllApplicationsSuccess = (response) => {
    return { type: GET_PROPERTY_ALL_APPLICATIONS_SUCCESS, response }
}

export const getPropertyAllApplicationsAlert = (response) => {
    return { type: GET_PROPERTY_ALL_APPLICATIONS_ALERT, response }
}

export const getPropertyAllApplicationsFail = (response) => {
    return { type: GET_PROPERTY_ALL_APPLICATIONS_FAIL, response }
}