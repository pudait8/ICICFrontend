import {
    GET_AUTHORITY_LIST,
    GET_AUTHORITY_LIST_SUCCESS,
    GET_AUTHORITY_LIST_FAIL,
    GET_AUTHORITY_LIST_ALERT,
    GET_AUTHORITY_LIST_RESET_STATE,
} from '../actions/getAuthorityListAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    list: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_AUTHORITY_LIST:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_AUTHORITY_LIST_SUCCESS:
            return {
                ...state,
                apiState: "success",
                list: action.response.data.CustomObject
            }

        case GET_AUTHORITY_LIST_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case GET_AUTHORITY_LIST_FAIL:
            return {
                ...state,
                apiState: "error",
                apiMessage: strings.api_err_msg
            }

        case GET_AUTHORITY_LIST_RESET_STATE:
            return initialState

        default:
            return state
    }
}
