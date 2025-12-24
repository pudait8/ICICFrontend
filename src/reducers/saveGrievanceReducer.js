import {
    SAVE_GRIEVANCE,
    SAVE_GRIEVANCE_SUCCESS,
    SAVE_GRIEVANCE_FAIL,
    SAVE_GRIEVANCE_ALERT,
    SAVE_GRIEVANCE_RESET_STATE,
} from '../actions/saveGrievanceAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_GRIEVANCE:
            return {
                ...state,
                apiState: "loading",
            }

        case SAVE_GRIEVANCE_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject,
                apiMessage: action.response.data.Message
            }

        case SAVE_GRIEVANCE_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case SAVE_GRIEVANCE_FAIL:
            return {
                ...state,
                apiState: "error",
                apiMessage: strings.api_err_msg
            }

        case SAVE_GRIEVANCE_RESET_STATE:
            return initialState

        default:
            return state
    }
}
