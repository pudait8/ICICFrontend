import {
    SAVE_WORK_FLOW,
    SAVE_WORK_FLOW_SUCCESS,
    SAVE_WORK_FLOW_FAIL,
    SAVE_WORK_FLOW_ALERT,
    SAVE_WORK_FLOW_RESET_STATE,
} from '../actions/saveWorkFlowAction'


const initialState = {
    apiState: "", // loading, success, alert, error
    alertMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_WORK_FLOW:
            return {
                ...state,
                apiState: "loading",
            }

        case SAVE_WORK_FLOW_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject
            }

        case SAVE_WORK_FLOW_ALERT:
            return {
                ...state,
                apiState: "alert",
                alertMessage: action.response.data.Message
            }

        case SAVE_WORK_FLOW_FAIL:
            return {
                ...state,
                apiState: "error",
            }

        case SAVE_WORK_FLOW_RESET_STATE:
            return {
                ...state,
                apiState: "",
                alertMessage: "",
            }

        default:
            return state
    }
}
