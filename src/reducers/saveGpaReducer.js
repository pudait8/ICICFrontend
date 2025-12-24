import {
    SAVE_GPA,
    SAVE_GPA_SUCCESS,
    SAVE_GPA_FAIL,
    SAVE_GPA_ALERT,
    SAVE_GPA_RESET_STATE,
} from '../actions/saveGpaAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_GPA:
            return {
                ...state,
                apiState: "loading",
            }

        case SAVE_GPA_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject,
                apiMessage: action.response.data.Message
            }

        case SAVE_GPA_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case SAVE_GPA_FAIL:
            return {
                ...state,
                apiState: "error",
                apiMessage: strings.api_err_msg
            }

        case SAVE_GPA_RESET_STATE:
            return initialState

        default:
            return state
    }
}
