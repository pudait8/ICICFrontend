export const SAVE_LEGAL_HEIR_TRANSFER_APPLICATION = 'SAVE_LEGAL_HEIR_TRANSFER_APPLICATION'
export const SAVE_LEGAL_HEIR_TRANSFER_APPLICATION_SUCCESS = 'SAVE_LEGAL_HEIR_TRANSFER_APPLICATION_SUCCESS'
export const SAVE_LEGAL_HEIR_TRANSFER_APPLICATION_ALERT = 'SAVE_LEGAL_HEIR_TRANSFER_APPLICATION_ALERT'
export const SAVE_LEGAL_HEIR_TRANSFER_APPLICATION_FAIL = 'SAVE_LEGAL_HEIR_TRANSFER_APPLICATION_FAIL'

export const saveLegalHeirTransferApplication = (params) => {
    return { type: SAVE_LEGAL_HEIR_TRANSFER_APPLICATION, params }
}

export const saveLegalHeirTransferApplicationSuccess = (response) => {
    return { type: SAVE_LEGAL_HEIR_TRANSFER_APPLICATION_SUCCESS, response }
}

export const saveLegalHeirTransferApplicationAlert = (response) => {
    return { type: SAVE_LEGAL_HEIR_TRANSFER_APPLICATION_ALERT, response }
}

export const saveLegalHeirTransferApplicationFail = (response) => {
    return { type: SAVE_LEGAL_HEIR_TRANSFER_APPLICATION_FAIL, response }
}