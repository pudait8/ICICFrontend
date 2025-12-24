export const GET_SALUTATION_LIST = 'GET_SALUTATION_LIST'
export const GET_SALUTATION_LIST_SUCCESS = 'GET_SALUTATION_LIST_SUCCESS'
export const GET_SALUTATION_LIST_ALERT = 'GET_SALUTATION_LIST_ALERT'
export const GET_SALUTATION_LIST_FAIL = 'GET_SALUTATION_LIST_FAIL'


export const getSalutationList = (params) => {
    return { type: GET_SALUTATION_LIST, params }
}

export const getSalutationListSuccess = (response) => {
    return { type: GET_SALUTATION_LIST_SUCCESS, response }
}

export const getSalutationListAlert = (response) => {
    return { type: GET_SALUTATION_LIST_ALERT, response }
}

export const getSalutationListFail = (response) => {
    return { type: GET_SALUTATION_LIST_FAIL, response }
}
