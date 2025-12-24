import {
    SAVE_PURCHASER_TRANSFER_APPLICATION,
    SAVE_PURCHASER_TRANSFER_APPLICATION_SUCCESS,
    SAVE_PURCHASER_TRANSFER_APPLICATION_FAIL,
    SAVE_PURCHASER_TRANSFER_APPLICATION_ALERT,
    SAVE_PURCHASER_TRANSFER_APPLICATION_RESET,
} from '../actions/transferApplicationSavePurchaserActions'


const initialState = {
    apiState: "", // loading, success, alert, error
    alertMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_PURCHASER_TRANSFER_APPLICATION:
            return {
                ...state,
                apiState: "loading",
            }

        case SAVE_PURCHASER_TRANSFER_APPLICATION_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject,
            }

        case SAVE_PURCHASER_TRANSFER_APPLICATION_ALERT:
            return {
                ...state,
                apiState: "alert",
                alertMessage: action.response.data.Message
            }

        case SAVE_PURCHASER_TRANSFER_APPLICATION_FAIL:
            return {
                ...state,
                apiState: "error",
            }

        case SAVE_PURCHASER_TRANSFER_APPLICATION_RESET:
            return initialState

        default:
            return state
    }
}
