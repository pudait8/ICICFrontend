import {
    GTE_NDC_DETAILS,
    GTE_NDC_DETAILS_SUCCESS,
    GTE_NDC_DETAILS_FAIL,
    GTE_NDC_DETAILS_ALERT,
    GTE_NDC_DETAILS_RESET_STATE,
} from '../actions/getNdcDetailsAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GTE_NDC_DETAILS:
            return {
                ...state,
                apiState: "loading",
            }

        case GTE_NDC_DETAILS_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject
            }

        case GTE_NDC_DETAILS_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case GTE_NDC_DETAILS_FAIL:
            return {
                ...state,
                apiState: "error",
                apiMessage: strings.api_err_msg
            }

        case GTE_NDC_DETAILS_RESET_STATE:
            return initialState

        default:
            return state
    }
}
