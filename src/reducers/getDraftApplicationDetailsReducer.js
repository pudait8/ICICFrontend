import {
    GET_DRAFT_APPLICATION_DETAILS,
    GET_DRAFT_APPLICATION_DETAILS_SUCCESS,
    GET_DRAFT_APPLICATION_DETAILS_FAIL,
    GET_DRAFT_APPLICATION_DETAILS_ALERT,
    GET_DRAFT_APPLICATION_DETAILS_RESET_STATE,
} from '../actions/getDraftApplicationDetailsAction'

const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DRAFT_APPLICATION_DETAILS:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_DRAFT_APPLICATION_DETAILS_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject,
                apiMessage: action.response.data.Message
            }

        case GET_DRAFT_APPLICATION_DETAILS_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case GET_DRAFT_APPLICATION_DETAILS_FAIL:
            return {
                ...state,
                apiState: "error",
            }

        case GET_DRAFT_APPLICATION_DETAILS_RESET_STATE:
            return {
                ...state,
                apiState: "",
                apiMessage: "",
            }

        default:
            return state
    }
}




