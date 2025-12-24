import {
    GET_FEE_DETAILS,
    GET_FEE_DETAILS_SUCCESS,
    GET_FEE_DETAILS_FAIL,
    GET_FEE_DETAILS_ALERT,
    GET_FEE_DETAILS_RESET_STATE,
} from '../actions/getFeeDetailsAction'


const initialState = {
    apiState: "", // loading, success, alert, error
    alertMessage: "",
    data: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_FEE_DETAILS:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_FEE_DETAILS_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject,
            }

        case GET_FEE_DETAILS_ALERT:
            return {
                ...state,
                apiState: "alert",
                alertMessage: action.response.data.Message
            }

        case GET_FEE_DETAILS_FAIL:
            return {
                ...state,
                apiState: "error",
            }

        case GET_FEE_DETAILS_RESET_STATE:
            return initialState

        default:
            return state
    }
}
