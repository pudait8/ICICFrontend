import {
    GET_APPLICATION_PROGRESS,
    GET_APPLICATION_PROGRESS_SUCCESS,
    GET_APPLICATION_PROGRESS_FAIL,
    GET_APPLICATION_PROGRESS_ALERT,
} from "../actions/getApplicationProgressAction"


const initialState = {
    uiState: "", // loading, ideal, error
    ProgressSummary: [],
    list: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_APPLICATION_PROGRESS:
            return {
                ...state,
                uiState: "loading",
            }

        case GET_APPLICATION_PROGRESS_SUCCESS:
            return {
                ...state,
                uiState: "ideal",
                ProgressSummary: action.response.data.CustomObject.ProgressSummary,
                list: action.response.data.CustomObject.ProgressDetails,
            }

        case GET_APPLICATION_PROGRESS_FAIL:
            return {
                ...state,
                uiState: "error",
            }

        case GET_APPLICATION_PROGRESS_ALERT:
            return {
                ...state,
                uiState: "error",
            }

        default:
            return state
    }
}
