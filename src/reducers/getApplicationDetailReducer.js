import {
    GET_APPLICATION_DETAIL,
    GET_APPLICATION_DETAIL_SUCCESS,
    GET_APPLICATION_DETAIL_FAIL,
    GET_APPLICATION_DETAIL_ALERT,
} from "../actions/getApplicationDetailAction"


const initialState = {
    uiState: "", // loading, ideal, alert, error
    data: {},
    apiMessage: "",
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_APPLICATION_DETAIL:
            return {
                ...state,
                uiState: "loading",
            }

        case GET_APPLICATION_DETAIL_SUCCESS:
            return {
                ...state,
                uiState: "ideal",
                data: action.response.data.CustomObject,
            }

        case GET_APPLICATION_DETAIL_FAIL:
            return {
                ...state,
                uiState: "error",
                data: {},
            }

        case GET_APPLICATION_DETAIL_ALERT:
            return {
                ...state,
                uiState: "alert",
                apiMessage: action.response.data.Message,
                data: {},
            }

        default:
            return state
    }
}
