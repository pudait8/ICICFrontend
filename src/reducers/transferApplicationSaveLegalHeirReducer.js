import {
    SAVE_LEGAL_HEIR_TRANSFER_APPLICATION,
    SAVE_LEGAL_HEIR_TRANSFER_APPLICATION_SUCCESS,
    SAVE_LEGAL_HEIR_TRANSFER_APPLICATION_FAIL,
    SAVE_LEGAL_HEIR_TRANSFER_APPLICATION_ALERT,
} from '../actions/transferApplicationSaveLegalHeirActions'


const initialState = {
    apiState: "", // loading, success, alert, error
    alertMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_LEGAL_HEIR_TRANSFER_APPLICATION:
            return {
                ...state,
                apiState: "loading",
            }

        case SAVE_LEGAL_HEIR_TRANSFER_APPLICATION_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject,
            }

        case SAVE_LEGAL_HEIR_TRANSFER_APPLICATION_ALERT:
            return {
                ...state,
                apiState: "alert",
                alertMessage: action.response.data.Message
            }

        case SAVE_LEGAL_HEIR_TRANSFER_APPLICATION_FAIL:
            return {
                ...state,
                apiState: "error",
            }

        default:
            return state
    }
}
