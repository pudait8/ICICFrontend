import {
    GET_WATER_RECEIPT,
    GET_WATER_RECEIPT_SUCCESS,
    GET_WATER_RECEIPT_FAIL,
    GET_WATER_RECEIPT_ALERT,
    GET_WATER_RECEIPT_RESET,
} from '../actions/getWaterReceiptAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_WATER_RECEIPT:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_WATER_RECEIPT_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject
            }

        case GET_WATER_RECEIPT_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case GET_WATER_RECEIPT_FAIL:
            return {
                ...state,
                apiState: "error",
                apiMessage: strings.api_err_msg
            }

        case GET_WATER_RECEIPT_RESET:
            return initialState

        default:
            return state
    }
}
