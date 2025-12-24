export const SAVE_WORK_FLOW = 'SAVE_WORK_FLOW'
export const SAVE_WORK_FLOW_SUCCESS = 'SAVE_WORK_FLOW_SUCCESS'
export const SAVE_WORK_FLOW_ALERT = 'SAVE_WORK_FLOW_ALERT'
export const SAVE_WORK_FLOW_FAIL = 'SAVE_WORK_FLOW_FAIL'
export const SAVE_WORK_FLOW_RESET_STATE = 'SAVE_WORK_FLOW_RESET_STATE'

export const saveWorkFlow = (params) => {
    return { type: SAVE_WORK_FLOW, params }
}

export const saveWorkFlowSuccess = (response) => {
    return { type: SAVE_WORK_FLOW_SUCCESS, response }
}

export const saveWorkFlowAlert = (response) => {
    return { type: SAVE_WORK_FLOW_ALERT, response }
}

export const saveWorkFlowFail = (response) => {
    return { type: SAVE_WORK_FLOW_FAIL, response }
}

export const saveWorkFlowrRsetState = () => {
    return { type: SAVE_WORK_FLOW_RESET_STATE }
}