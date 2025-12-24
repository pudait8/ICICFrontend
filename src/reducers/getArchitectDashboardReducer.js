import {
    GET_ARCHITECT_DASHBOARD,
    GET_ARCHITECT_DASHBOARD_SUCCESS,
    GET_ARCHITECT_DASHBOARD_FAIL,
    GET_ARCHITECT_DASHBOARD_ALERT,
    GET_ARCHITECT_DASHBOARD_RESET_STATE,
} from '../actions/getArchitectDashboardAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ARCHITECT_DASHBOARD:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_ARCHITECT_DASHBOARD_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject
            }

        case GET_ARCHITECT_DASHBOARD_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case GET_ARCHITECT_DASHBOARD_FAIL:
            return {
                ...state,
                apiState: "error",
                apiMessage: strings.api_err_msg
            }

        case GET_ARCHITECT_DASHBOARD_RESET_STATE:
            return initialState

        default:
            return state
    }
}
