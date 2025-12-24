import {
    SAVE_CHANGE_OF_OWNERSHIP_APPLICATION,
    SAVE_CHANGE_OF_OWNERSHIP_APPLICATION_SUCCESS,
    SAVE_CHANGE_OF_OWNERSHIP_APPLICATION_FAIL,
    SAVE_CHANGE_OF_OWNERSHIP_APPLICATION_ALERT,
    RESET_STATE_SAVE_CHANGE_OF_OWNERSHIP_APPLICATION,
} from '../actions/saveChangeOfOwnershipApplicationAction'


const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_CHANGE_OF_OWNERSHIP_APPLICATION:
            return {
                ...state,
                apiState: "loading",
            }

        case SAVE_CHANGE_OF_OWNERSHIP_APPLICATION_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject,
                apiMessage: action.response.data.Message
            }

        case SAVE_CHANGE_OF_OWNERSHIP_APPLICATION_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case SAVE_CHANGE_OF_OWNERSHIP_APPLICATION_FAIL:
            return {
                ...state,
                apiState: "error",
            }

        case RESET_STATE_SAVE_CHANGE_OF_OWNERSHIP_APPLICATION:
            return {
                ...state,
                apiState: "",
                apiMessage: "",
            }

        default:
            return state
    }
}
