import {
    SAVE_TRANSFER_APPLICATION,
    SAVE_TRANSFER_APPLICATION_SUCCESS,
    SAVE_TRANSFER_APPLICATION_FAIL,
    SAVE_TRANSFER_APPLICATION_ALERT,
    SAVE_TRANSFER_APPLICATION_RESET_STATE,
} from '../actions/transferApplicationSaveActions'


const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_TRANSFER_APPLICATION:
            return {
                ...state,
                apiState: "loading",
            }

        case SAVE_TRANSFER_APPLICATION_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject,
                apiMessage: action.response.data.Message
            }

        case SAVE_TRANSFER_APPLICATION_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case SAVE_TRANSFER_APPLICATION_FAIL:
            return {
                ...state,
                apiState: "error",
            }

        case SAVE_TRANSFER_APPLICATION_RESET_STATE:
            return initialState

        default:
            return state
    }
}
