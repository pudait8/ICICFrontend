import {
    GET_WATER_BILL_DETAILS,
    GET_WATER_BILL_DETAILS_SUCCESS,
    GET_WATER_BILL_DETAILS_FAIL,
    GET_WATER_BILL_DETAILS_ALERT,
    GET_WATER_BILL_DETAILS_RESET,
} from '../actions/getWaterBillDetailsAction'
import strings from "../strings.json"

const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_WATER_BILL_DETAILS:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_WATER_BILL_DETAILS_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject
            }

        case GET_WATER_BILL_DETAILS_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case GET_WATER_BILL_DETAILS_FAIL:
            return {
                ...state,
                apiState: "error",
                apiMessage: strings.api_err_msg
            }

        case GET_WATER_BILL_DETAILS_RESET:
            return initialState

        default:
            return state
    }
}
