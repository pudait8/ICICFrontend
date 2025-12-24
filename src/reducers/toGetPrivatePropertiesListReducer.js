import {
    TO_GET_PRIVATE_PROPERTIES_LIST,
    TO_GET_PRIVATE_PROPERTIES_LIST_SUCCESS,
    TO_GET_PRIVATE_PROPERTIES_LIST_FAIL,
    TO_GET_PRIVATE_PROPERTIES_LIST_ALERT,
    TO_GET_PRIVATE_PROPERTIES_LIST_RESET_STATE,
} from '../actions/toGetPrivatePropertiesListAction'


const initialState = {
    apiState: "", // loading, success, alert, error
    alertMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case TO_GET_PRIVATE_PROPERTIES_LIST:
            return {
                ...state,
                apiState: "loading",
            }

        case TO_GET_PRIVATE_PROPERTIES_LIST_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject,
            }

        case TO_GET_PRIVATE_PROPERTIES_LIST_ALERT:
            return {
                ...state,
                apiState: "alert",
                alertMessage: action.response.data.Message
            }

        case TO_GET_PRIVATE_PROPERTIES_LIST_FAIL:
            return {
                ...state,
                apiState: "error",
            }

        case TO_GET_PRIVATE_PROPERTIES_LIST_RESET_STATE:
            return initialState

        default:
            return state
    }
}
