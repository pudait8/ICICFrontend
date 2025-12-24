import {
    GET_OLD_BILL_DETAILS,
    GET_OLD_BILL_DETAILS_SUCCESS,
    GET_OLD_BILL_DETAILS_FAIL,
    GET_OLD_BILL_DETAILS_ALERT,
    GET_OLD_BILL_DETAILS_RESET_STATE,
} from '../actions/getOldBillDetailsAction'


const initialState = {
    apiState: "", // loading, success, alert, error
    alertMessage: "",
    data: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_OLD_BILL_DETAILS:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_OLD_BILL_DETAILS_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject,
            }

        case GET_OLD_BILL_DETAILS_ALERT:
            return {
                ...state,
                apiState: "alert",
                alertMessage: action.response.data.Message
            }

        case GET_OLD_BILL_DETAILS_FAIL:
            return {
                ...state,
                apiState: "error",
            }

        case GET_OLD_BILL_DETAILS_RESET_STATE:
            return initialState

        default:
            return state
    }
}
