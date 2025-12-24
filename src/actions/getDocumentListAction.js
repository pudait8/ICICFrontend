export const GET_DOCUMENT_LIST = 'GET_DOCUMENT_LIST'
export const GET_DOCUMENT_LIST_SUCCESS = 'GET_DOCUMENT_LIST_SUCCESS'
export const GET_DOCUMENT_LIST_ALERT = 'GET_DOCUMENT_LIST_ALERT'
export const GET_DOCUMENT_LIST_FAIL = 'GET_DOCUMENT_LIST_FAIL'
export const GET_DOCUMENT_LIST_RESET_STATE = 'GET_DOCUMENT_LIST_RESET_STATE'

export const getDocumentList = (params) => {
    return { type: GET_DOCUMENT_LIST, params }
}

export const getDocumentListSuccess = (response) => {
    return { type: GET_DOCUMENT_LIST_SUCCESS, response }
}

export const getDocumentListAlert = (response) => {
    return { type: GET_DOCUMENT_LIST_ALERT, response }
}

export const getDocumentListFail = (response) => {
    return { type: GET_DOCUMENT_LIST_FAIL, response }
}

export const getDocumentListResetState = () => {
    return { type: GET_DOCUMENT_LIST_RESET_STATE }
}
