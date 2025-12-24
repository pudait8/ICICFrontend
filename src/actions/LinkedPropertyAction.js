/* List of linked preperty */
export const LINKED_PROPERTY_REQUEST_LIST = 'LINKED_PROPERTY_REQUEST_LIST'
export const LINKED_PROPERTY_REQUEST_LIST_SUCCESS = 'LINKED_PROPERTY_REQUEST_LIST_SUCCESS'
export const LINKED_PROPERTY_REQUEST_LIST_ALERT = 'LINKED_PROPERTY_REQUEST_LIST_ALERT'
export const LINKED_PROPERTY_REQUEST_LIST_FAIL = 'LINKED_PROPERTY_REQUEST_LIST_FAIL'

export const linkedPropertyRequestList = (params) => {
    return {type:LINKED_PROPERTY_REQUEST_LIST,params}
}

export const linkedPropertyRequestListSuccess = (response) => {
    return {type:LINKED_PROPERTY_REQUEST_LIST_SUCCESS,response}
}

export const linkedPropertyRequestListAlert = (response) => {
    return {type:LINKED_PROPERTY_REQUEST_LIST_ALERT,response}
}

export const linkedPropertyRequestListFail = (response) => {
    return {type:LINKED_PROPERTY_REQUEST_LIST_FAIL,response}
}