export const SAVE_TRANSFER_APPLICATION = 'SAVE_TRANSFER_APPLICATION'
export const SAVE_TRANSFER_APPLICATION_SUCCESS = 'SAVE_TRANSFER_APPLICATION_SUCCESS'
export const SAVE_TRANSFER_APPLICATION_ALERT = 'SAVE_TRANSFER_APPLICATION_ALERT'
export const SAVE_TRANSFER_APPLICATION_FAIL = 'SAVE_TRANSFER_APPLICATION_FAIL'
export const SAVE_TRANSFER_APPLICATION_RESET_STATE = 'SAVE_TRANSFER_APPLICATION_RESET_STATE'

export const saveTransferApplication = (params) => {
    return { type: SAVE_TRANSFER_APPLICATION, params }
}

export const saveTransferApplicationSuccess = (response) => {
    return { type: SAVE_TRANSFER_APPLICATION_SUCCESS, response }
}

export const saveTransferApplicationAlert = (response) => {
    return { type: SAVE_TRANSFER_APPLICATION_ALERT, response }
}

export const saveTransferApplicationFail = (response) => {
    return { type: SAVE_TRANSFER_APPLICATION_FAIL, response }
}
export const saveTransferApplicationResetState = (response) => {
    return { type: SAVE_TRANSFER_APPLICATION_RESET_STATE, response }
}