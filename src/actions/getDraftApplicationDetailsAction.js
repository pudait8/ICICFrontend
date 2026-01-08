export const GET_DRAFT_APPLICATION_DETAILS = 'GET_DRAFT_APPLICATION_DETAILS'
export const GET_DRAFT_APPLICATION_DETAILS_SUCCESS = 'GET_DRAFT_APPLICATION_DETAILS_SUCCESS'
export const GET_DRAFT_APPLICATION_DETAILS_ALERT = 'GET_DRAFT_APPLICATION_DETAILS_ALERT'
export const GET_DRAFT_APPLICATION_DETAILS_FAIL = 'GET_DRAFT_APPLICATION_DETAILS_FAIL'
export const GET_DRAFT_APPLICATION_DETAILS_RESET_STATE = 'GET_DRAFT_APPLICATION_DETAILS_RESET_STATE'

export const getDraftApplicationDetails = (params) => {
    return { type: GET_DRAFT_APPLICATION_DETAILS, params }
}

export const getDraftApplicationDetailsSuccess = (response) => {
    return { type: GET_DRAFT_APPLICATION_DETAILS_SUCCESS, response }
}

export const getDraftApplicationDetailsAlert = (response) => {
    return { type: GET_DRAFT_APPLICATION_DETAILS_ALERT, response }
}

export const getDraftApplicationDetailsFail = (response) => {
    return { type: GET_DRAFT_APPLICATION_DETAILS_FAIL, response }
}

export const getDraftApplicationDetailsResetState = () => {
    return { type: GET_DRAFT_APPLICATION_DETAILS_RESET_STATE }
}




