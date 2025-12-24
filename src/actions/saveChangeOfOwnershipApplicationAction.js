export const SAVE_CHANGE_OF_OWNERSHIP_APPLICATION = 'SAVE_CHANGE_OF_OWNERSHIP_APPLICATION'
export const SAVE_CHANGE_OF_OWNERSHIP_APPLICATION_SUCCESS = 'SAVE_CHANGE_OF_OWNERSHIP_APPLICATION_SUCCESS'
export const SAVE_CHANGE_OF_OWNERSHIP_APPLICATION_ALERT = 'SAVE_CHANGE_OF_OWNERSHIP_APPLICATION_ALERT'
export const SAVE_CHANGE_OF_OWNERSHIP_APPLICATION_FAIL = 'SAVE_CHANGE_OF_OWNERSHIP_APPLICATION_FAIL'
export const RESET_STATE_SAVE_CHANGE_OF_OWNERSHIP_APPLICATION = 'RESET_STATE_SAVE_CHANGE_OF_OWNERSHIP_APPLICATION'

export const saveChangeOfOwnershipApplication = (params) => {
    return { type: SAVE_CHANGE_OF_OWNERSHIP_APPLICATION, params }
}

export const saveChangeOfOwnershipApplicationSuccess = (response) => {
    return { type: SAVE_CHANGE_OF_OWNERSHIP_APPLICATION_SUCCESS, response }
}

export const saveChangeOfOwnershipApplicationAlert = (response) => {
    return { type: SAVE_CHANGE_OF_OWNERSHIP_APPLICATION_ALERT, response }
}

export const saveChangeOfOwnershipApplicationFail = (response) => {
    return { type: SAVE_CHANGE_OF_OWNERSHIP_APPLICATION_FAIL, response }
}

export const resetStateSaveChangeOfOwnershipApplication = () => {
    return { type: RESET_STATE_SAVE_CHANGE_OF_OWNERSHIP_APPLICATION }
}