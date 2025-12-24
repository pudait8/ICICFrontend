import {
    VIEW_EDIT_APPLICATION,
    VIEW_EDIT_APPLICATION_SUCCESS,
    VIEW_EDIT_APPLICATION_FAIL,
    VIEW_EDIT_APPLICATION_ALERT,
    VIEW_EDIT_APPLICATION_RESET_STATE,
} from '../actions/viewEditApplicationAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case VIEW_EDIT_APPLICATION:
            return {
                ...state,
                apiState: "loading",
            }

        case VIEW_EDIT_APPLICATION_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject
            }

        case VIEW_EDIT_APPLICATION_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case VIEW_EDIT_APPLICATION_FAIL:
            return {
                ...state,
                apiState: "error",
                apiMessage: strings.api_err_msg
            }

        case VIEW_EDIT_APPLICATION_RESET_STATE:
            return initialState

        default:
            return state
    }
}
