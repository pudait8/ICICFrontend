import {
    GET_PROPERTY_LEDGER,
    GET_PROPERTY_LEDGER_SUCCESS,
    GET_PROPERTY_LEDGER_FAIL,
    GET_PROPERTY_LEDGER_ALERT,
    GET_PROPERTY_LEDGER_RESET_STATE,
} from '../actions/getPropertyLedgerAction'


const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROPERTY_LEDGER:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_PROPERTY_LEDGER_SUCCESS:
            return {
                ...state,
                apiState: "success",
                data: action.response.data.CustomObject,
            }

        case GET_PROPERTY_LEDGER_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case GET_PROPERTY_LEDGER_FAIL:
            return {
                ...state,
                apiState: "error",
            }

        case GET_PROPERTY_LEDGER_RESET_STATE:
            return initialState

        default:
            return state
    }
}
