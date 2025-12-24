import {
    GET_APPLICATIONTOTAL_TOTAL_STATUS,
    GET_APPLICATIONTOTAL_TOTAL_STATUS_ALERT,
    GET_APPLICATIONTOTAL_TOTAL_STATUS_FAIL,
    GET_APPLICATIONTOTAL_TOTAL_STATUS_RESET_STATE,
    GET_APPLICATIONTOTAL_TOTAL_STATUS_SUCCESS
} from '../actions/getApplicationTotalStatusAction'


const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    list: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_APPLICATIONTOTAL_TOTAL_STATUS:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_APPLICATIONTOTAL_TOTAL_STATUS_SUCCESS:
            return {
                ...state,
                apiState: "success",
                list: action.response.data.CustomObject
            }

        case GET_APPLICATIONTOTAL_TOTAL_STATUS_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case GET_APPLICATIONTOTAL_TOTAL_STATUS_FAIL:
            return {
                ...state,
                apiState: "error",
            }

        case GET_APPLICATIONTOTAL_TOTAL_STATUS_RESET_STATE:
            return initialState

        default:
            return state
    }
}
