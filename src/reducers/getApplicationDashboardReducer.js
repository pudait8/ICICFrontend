import {
    GET_APPLICATION_DASHBOARD,
    GET_APPLICATION_DASHBOARD_SUCCESS,
    GET_APPLICATION_DASHBOARD_FAIL,
    GET_APPLICATION_DASHBOARD_ALERT,
    GET_APPLICATION_DASHBOARD_RESET_STATE,
} from '../actions/getApplicationDashboardAction'


const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    list: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_APPLICATION_DASHBOARD:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_APPLICATION_DASHBOARD_SUCCESS:
            return {
                ...state,
                apiState: "success",
                list: action.response.data.CustomObject
            }

        case GET_APPLICATION_DASHBOARD_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case GET_APPLICATION_DASHBOARD_FAIL:
            return {
                ...state,
                apiState: "error",
            }

        case GET_APPLICATION_DASHBOARD_RESET_STATE:
            return initialState

        default:
            return state
    }
}
