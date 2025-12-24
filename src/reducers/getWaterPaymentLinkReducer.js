import {
    GET_WATER_PAYMENT_LINK,
    GET_WATER_PAYMENT_LINK_SUCCESS,
    GET_WATER_PAYMENT_LINK_FAIL,
    GET_WATER_PAYMENT_LINK_ALERT,
    GET_WATER_PAYMENT_LINK_RESET,
} from '../actions/getWaterPaymentLinkAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_WATER_PAYMENT_LINK:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_WATER_PAYMENT_LINK_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject
            }

        case GET_WATER_PAYMENT_LINK_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case GET_WATER_PAYMENT_LINK_FAIL:
            return {
                ...state,
                apiState: "error",
                apiMessage: strings.api_err_msg
            }

        case GET_WATER_PAYMENT_LINK_RESET:
            return initialState

        default:
            return state
    }
}
