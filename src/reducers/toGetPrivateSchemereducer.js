import {
    TO_GET_PRIVATE_SCHEME,
    TO_GET_PRIVATE_SCHEME_SUCCESS,
    TO_GET_PRIVATE_SCHEME_FAIL,
    TO_GET_PRIVATE_SCHEME_ALERT,
    TO_GET_PRIVATE_SCHEME_RESET_STATE,
} from '../actions/toGetPrivateSchemeAction'


const initialState = {
    apiState: "", // loading, success, alert, error
    alertMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case TO_GET_PRIVATE_SCHEME:
            return {
                ...state,
                apiState: "loading",
            }

        case TO_GET_PRIVATE_SCHEME_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject,
            }

        case TO_GET_PRIVATE_SCHEME_ALERT:
            return {
                ...state,
                apiState: "alert",
                alertMessage: action.response.data.Message
            }

        case TO_GET_PRIVATE_SCHEME_FAIL:
            return {
                ...state,
                apiState: "error",
            }

        case TO_GET_PRIVATE_SCHEME_RESET_STATE:
            return initialState

        default:
            return state
    }
}
