import {
    GET_ZONING_DETAILS,
    GET_ZONING_DETAILS_SUCCESS,
    GET_ZONING_DETAILS_FAIL,
    GET_ZONING_DETAILS_ALERT,
    GET_ZONING_DETAILS_RESET_STATE,
} from '../actions/getZoningDetailsAction'


const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ZONING_DETAILS:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_ZONING_DETAILS_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject,
            }

        case GET_ZONING_DETAILS_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case GET_ZONING_DETAILS_FAIL:
            return {
                ...state,
                apiState: "error",
            }

        case GET_ZONING_DETAILS_RESET_STATE:
            return initialState

        default:
            return state
    }
}
