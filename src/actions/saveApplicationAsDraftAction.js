export const SAVE_APPLICATION_AS_DRAFT = 'SAVE_APPLICATION_AS_DRAFT'
export const SAVE_APPLICATION_AS_DRAFT_SUCCESS = 'SAVE_APPLICATION_AS_DRAFT_SUCCESS'
export const SAVE_APPLICATION_AS_DRAFT_ALERT = 'SAVE_APPLICATION_AS_DRAFT_ALERT'
export const SAVE_APPLICATION_AS_DRAFT_FAIL = 'SAVE_APPLICATION_AS_DRAFT_FAIL'
export const RESET_STATE_SAVE_APPLICATION_AS_DRAFT = 'RESET_STATE_SAVE_APPLICATION_AS_DRAFT'

export const saveApplicationAsDraft = (params) => {
    return { type: SAVE_APPLICATION_AS_DRAFT, params }
}

export const saveApplicationAsDraftSuccess = (response) => {
    return { type: SAVE_APPLICATION_AS_DRAFT_SUCCESS, response }
}

export const saveApplicationAsDraftAlert = (response) => {
    return { type: SAVE_APPLICATION_AS_DRAFT_ALERT, response }
}

export const saveApplicationAsDraftFail = (response) => {
    return { type: SAVE_APPLICATION_AS_DRAFT_FAIL, response }
}

export const resetStateSaveApplicationAsDraft = () => {
    return { type: RESET_STATE_SAVE_APPLICATION_AS_DRAFT }
}







