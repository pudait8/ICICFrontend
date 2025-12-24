import {
    DELETE_PURCHASER_TRANSFER_APPLICATION,
    DELETE_PURCHASER_TRANSFER_APPLICATION_SUCCESS,
    DELETE_PURCHASER_TRANSFER_APPLICATION_FAIL,
    DELETE_PURCHASER_TRANSFER_APPLICATION_ALERT,
} from '../actions/transferApplicationDeletePurchaserActions'


const initialState = {
    apiState: "", // loading, success, alert, error
    alertMessage: "",
}

export default function (state = initialState, action) {
    switch (action.type) {
        case DELETE_PURCHASER_TRANSFER_APPLICATION:
            return {
                ...state,
                apiState: "loading",
            }

        case DELETE_PURCHASER_TRANSFER_APPLICATION_SUCCESS:
            return {
                ...state,
                apiState: "success",
            }

        case DELETE_PURCHASER_TRANSFER_APPLICATION_ALERT:
            return {
                ...state,
                apiState: "alert",
                alertMessage: action.response.data.Message
            }

        case DELETE_PURCHASER_TRANSFER_APPLICATION_FAIL:
            return {
                ...state,
                apiState: "error",
            }

        default:
            return state
    }
}
