export const GET_PROPERTY_PERMISSIONS_DETAIL = 'GET_PROPERTY_PERMISSIONS_DETAIL'
export const GET_PROPERTY_PERMISSIONS_DETAIL_SUCCESS = 'GET_PROPERTY_PERMISSIONS_DETAIL_SUCCESS'
export const GET_PROPERTY_PERMISSIONS_DETAIL_ALERT = 'GET_PROPERTY_PERMISSIONS_DETAIL_ALERT'
export const GET_PROPERTY_PERMISSIONS_DETAIL_FAIL = 'GET_PROPERTY_PERMISSIONS_DETAIL_FAIL'

export const getPropertyPermissionsDetail = (params) => {
    return { type: GET_PROPERTY_PERMISSIONS_DETAIL, params }
}

export const getPropertyPermissionsDetailSuccess = (response) => {
    return { type: GET_PROPERTY_PERMISSIONS_DETAIL_SUCCESS, response }
}

export const getPropertyPermissionsDetailAlert = (response) => {
    return { type: GET_PROPERTY_PERMISSIONS_DETAIL_ALERT, response }
}

export const getPropertyPermissionsDetailFail = (response) => {
    return { type: GET_PROPERTY_PERMISSIONS_DETAIL_FAIL, response }
}