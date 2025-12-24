import {
    PRIVATE_PROPERTY_APPLICATION,
    PRIVATE_PROPERTY_APPLICATION_SUCCESS,
    PRIVATE_PROPERTY_APPLICATION_FAIL,
    PRIVATE_PROPERTY_APPLICATION_RESET_STATE,
    PRIVATE_PROPERTY_APPLICATION_ALERT
} from '../actions/privatePropertyApplicationAction'


const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case PRIVATE_PROPERTY_APPLICATION:
            return {
                ...state,
                apiState: "loading",
            }

        case PRIVATE_PROPERTY_APPLICATION_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject,
                apiMessage: action.response.data.Message
            }

        case PRIVATE_PROPERTY_APPLICATION_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case PRIVATE_PROPERTY_APPLICATION_FAIL:
            return {
                ...state,
                apiState: "error",
            }

        case PRIVATE_PROPERTY_APPLICATION_RESET_STATE:
            return initialState

        default:
            return state
    }
}
