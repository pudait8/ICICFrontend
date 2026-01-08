import {
    SAVE_APPLICATION_AS_DRAFT,
    SAVE_APPLICATION_AS_DRAFT_SUCCESS,
    SAVE_APPLICATION_AS_DRAFT_FAIL,
    SAVE_APPLICATION_AS_DRAFT_ALERT,
    RESET_STATE_SAVE_APPLICATION_AS_DRAFT,
} from '../actions/saveApplicationAsDraftAction'


const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: {},
    uiState: "", // loading, ideal, empty, error
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_APPLICATION_AS_DRAFT:
            return {
                ...state,
                apiState: "loading",
                uiState: "loading",
            }

        case SAVE_APPLICATION_AS_DRAFT_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject,
                apiMessage: action.response.data.Message,
                uiState: "ideal",
            }

        case SAVE_APPLICATION_AS_DRAFT_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message,
                uiState: "alert",
            }

        case SAVE_APPLICATION_AS_DRAFT_FAIL:
            return {
                ...state,
                apiState: "error",
                uiState: "error",
            }

        case RESET_STATE_SAVE_APPLICATION_AS_DRAFT:
            return {
                ...state,
                apiState: "",
                apiMessage: "",
                uiState: "",
            }

        default:
            return state
    }
}







