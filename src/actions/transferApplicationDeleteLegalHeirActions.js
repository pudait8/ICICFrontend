export const DELETE_LEGAL_HEIR_TRANSFER_APPLICATION = 'DELETE_LEGAL_HEIR_TRANSFER_APPLICATION'
export const DELETE_LEGAL_HEIR_TRANSFER_APPLICATION_SUCCESS = 'DELETE_LEGAL_HEIR_TRANSFER_APPLICATION_SUCCESS'
export const DELETE_LEGAL_HEIR_TRANSFER_APPLICATION_ALERT = 'DELETE_LEGAL_HEIR_TRANSFER_APPLICATION_ALERT'
export const DELETE_LEGAL_HEIR_TRANSFER_APPLICATION_FAIL = 'DELETE_LEGAL_HEIR_TRANSFER_APPLICATION_FAIL'

export const deleteLegalHeirTransferApplication = (params) => {
    return { type: DELETE_LEGAL_HEIR_TRANSFER_APPLICATION, params }
}

export const deleteLegalHeirTransferApplicationSuccess = (response) => {
    return { type: DELETE_LEGAL_HEIR_TRANSFER_APPLICATION_SUCCESS, response }
}

export const deleteLegalHeirTransferApplicationAlert = (response) => {
    return { type: DELETE_LEGAL_HEIR_TRANSFER_APPLICATION_ALERT, response }
}

export const deleteLegalHeirTransferApplicationFail = (response) => {
    return { type: DELETE_LEGAL_HEIR_TRANSFER_APPLICATION_FAIL, response }
}