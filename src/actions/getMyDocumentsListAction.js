export const GET_MY_DOCUMENTS_LIST = 'GET_MY_DOCUMENTS_LIST'
export const GET_MY_DOCUMENTS_LIST_SUCCESS = 'GET_MY_DOCUMENTS_LIST_SUCCESS'
export const GET_MY_DOCUMENTS_LIST_ALERT = 'GET_MY_DOCUMENTS_LIST_ALERT'
export const GET_MY_DOCUMENTS_LIST_FAIL = 'GET_MY_DOCUMENTS_LIST_FAIL'

export const getMyDocumentsList = (params) => {
    return { type: GET_MY_DOCUMENTS_LIST, params }
}

export const getMyDocumentsListSuccess = (response) => {
    return { type: GET_MY_DOCUMENTS_LIST_SUCCESS, response }
}

export const getMyDocumentsListAlert = (response) => {
    return { type: GET_MY_DOCUMENTS_LIST_ALERT, response }
}

export const getMyDocumentsListFail = (response) => {
    return { type: GET_MY_DOCUMENTS_LIST_FAIL, response }
}