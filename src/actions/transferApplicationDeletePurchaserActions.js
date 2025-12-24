export const DELETE_PURCHASER_TRANSFER_APPLICATION = 'DELETE_PURCHASER_TRANSFER_APPLICATION'
export const DELETE_PURCHASER_TRANSFER_APPLICATION_SUCCESS = 'DELETE_PURCHASER_TRANSFER_APPLICATION_SUCCESS'
export const DELETE_PURCHASER_TRANSFER_APPLICATION_ALERT = 'DELETE_PURCHASER_TRANSFER_APPLICATION_ALERT'
export const DELETE_PURCHASER_TRANSFER_APPLICATION_FAIL = 'DELETE_PURCHASER_TRANSFER_APPLICATION_FAIL'

export const deletePurchaserTransferApplication = (params) => {
    return { type: DELETE_PURCHASER_TRANSFER_APPLICATION, params }
}

export const deletePurchaserTransferApplicationSuccess = (response) => {
    return { type: DELETE_PURCHASER_TRANSFER_APPLICATION_SUCCESS, response }
}

export const deletePurchaserTransferApplicationAlert = (response) => {
    return { type: DELETE_PURCHASER_TRANSFER_APPLICATION_ALERT, response }
}

export const deletePurchaserTransferApplicationFail = (response) => {
    return { type: DELETE_PURCHASER_TRANSFER_APPLICATION_FAIL, response }
}