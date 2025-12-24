import {
    SAVE_OWNER_PRIVATE_PROPERTIES,
    SAVE_OWNER_PRIVATE_PROPERTIES_SUCCESS,
    SAVE_OWNER_PRIVATE_PROPERTIES_FAIL,
    SAVE_OWNER_PRIVATE_PROPERTIES_ALERT,
    SAVE_OWNER_PRIVATE_PROPERTIES_RESET_STATE,
} from '../actions/saveOwnerPrivatePropertiesAction'


const initialState = {
    apiState: "", // loading, success, alert, error
    alertMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_OWNER_PRIVATE_PROPERTIES:
            return {
                ...state,
                apiState: "loading",
            }

        case SAVE_OWNER_PRIVATE_PROPERTIES_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject,
            }

        case SAVE_OWNER_PRIVATE_PROPERTIES_ALERT:
            return {
                ...state,
                apiState: "alert",
                alertMessage: action.response.data.Message
            }

        case SAVE_OWNER_PRIVATE_PROPERTIES_FAIL:
            return {
                ...state,
                apiState: "error",
            }

        case SAVE_OWNER_PRIVATE_PROPERTIES_RESET_STATE:
            return initialState

        default:
            return state
    }
}
