import {
    POST_AUTO_DCR,
    POST_AUTO_DCR_SUCCESS,
    POST_AUTO_DCR_FAIL,
    POST_AUTO_DCR_ALERT,
    POST_AUTO_DCR_RESET_STATE,
} from '../actions/postAutoDCRAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case POST_AUTO_DCR:
            return {
                ...state,
                apiState: "loading",
            }

        case POST_AUTO_DCR_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject,
                apiMessage: action.response.data.Message
            }

        case POST_AUTO_DCR_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case POST_AUTO_DCR_FAIL:
            return {
                ...state,
                apiState: "error",
                apiMessage: strings.api_err_msg
            }

        case POST_AUTO_DCR_RESET_STATE:
            return initialState

        default:
            return state
    }
}
