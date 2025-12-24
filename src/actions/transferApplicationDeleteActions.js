export const DELETE_TRANSFER_APPLICATION = 'DELETE_TRANSFER_APPLICATION'
export const DELETE_TRANSFER_APPLICATION_SUCCESS = 'DELETE_TRANSFER_APPLICATION_SUCCESS'
export const DELETE_TRANSFER_APPLICATION_ALERT = 'DELETE_TRANSFER_APPLICATION_ALERT'
export const DELETE_TRANSFER_APPLICATION_FAIL = 'DELETE_TRANSFER_APPLICATION_FAIL'

export const deleteTransferApplication = (params) => {
    return { type: DELETE_TRANSFER_APPLICATION, params }
}

export const deleteTransferApplicationSuccess = (response) => {
    return { type: DELETE_TRANSFER_APPLICATION_SUCCESS, response }
}

export const deleteTransferApplicationAlert = (response) => {
    return { type: DELETE_TRANSFER_APPLICATION_ALERT, response }
}

export const deleteTransferApplicationFail = (response) => {
    return { type: DELETE_TRANSFER_APPLICATION_FAIL, response }
}