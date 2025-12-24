import {
    GET_WEB_CONTENT,
    GET_WEB_CONTENT_SUCCESS,
    GET_WEB_CONTENT_FAIL,
    GET_WEB_CONTENT_ALERT,
    GET_WEB_CONTENT_RESET_STATE,
} from '../actions/getWebContentAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_WEB_CONTENT:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_WEB_CONTENT_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject
            }

        case GET_WEB_CONTENT_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case GET_WEB_CONTENT_FAIL:
            return {
                ...state,
                apiState: "error",
                apiMessage: strings.api_err_msg
            }

        case GET_WEB_CONTENT_RESET_STATE:
            return initialState

        default:
            return state
    }
}
