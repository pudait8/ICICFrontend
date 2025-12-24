import {
    VERIFY_PAN,
    VERIFY_PAN_SUCCESS,
    VERIFY_PAN_FAIL,
    VERIFY_PAN_ALERT,
    VERIFY_PAN_RESET_STATE,
} from '../actions/verifyPanAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case VERIFY_PAN:
            return {
                ...state,
                apiState: "loading",
            }

        case VERIFY_PAN_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject,
                apiMessage: action.response.data.Message
            }

        case VERIFY_PAN_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case VERIFY_PAN_FAIL:
            return {
                ...state,
                apiState: "error",
                apiMessage: action.response.data.Message
            }

        case VERIFY_PAN_RESET_STATE:
            return initialState

        default:
            return state
    }
}
