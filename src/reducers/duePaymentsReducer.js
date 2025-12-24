import {
    GET_PROPERTY_DUE_PAYMENTS,
    GET_PROPERTY_DUE_PAYMENTS_SUCCESS,
    GET_PROPERTY_DUE_PAYMENTS_FAIL,
    GET_PROPERTY_DUE_PAYMENTS_ALERT,
    GET_PROPERTY_DUE_PAYMENTS_RESET_STATE,

    GET_PAYMENT_INTEGRATION_PAYLOAD,
    GET_PAYMENT_INTEGRATION_PAYLOAD_SUCCESS,
    GET_PAYMENT_INTEGRATION_PAYLOAD_FAIL,
    GET_PAYMENT_INTEGRATION_PAYLOAD_ALERT,

    PAYMENT_INTEGRATION_STATUS_CHECK,
    PAYMENT_INTEGRATION_STATUS_CHECK_SUCCESS,
    PAYMENT_INTEGRATION_STATUS_CHECK_FAIL,
    PAYMENT_INTEGRATION_STATUS_CHECK_ALERT,
} from "./../actions/duePaymentsAction"


const initialState = {
    uiState: "", // loading, ideal, empty, error
    list: [],
    totalDueAmount: 0,

    paymentIntegrationApiState: "", // loading, ideal, alert, error
    paymentIntegrationPayload: {},

    statusCheckApiState: "", // loading, succcess, fail
    paymentStatus: "", // Success, Failed, In-Progress
    TransactionNo: ""
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROPERTY_DUE_PAYMENTS:
            return {
                ...state,
                uiState: "loading",
                totalDueAmount: 0
            }

        case GET_PROPERTY_DUE_PAYMENTS_SUCCESS:
            if (action.response.data.CustomObject && action.response.data.CustomObject.TotalDueAmount > 0) {
                return {
                    ...state,
                    uiState: "ideal",
                    list: action.response.data.CustomObject.headDetails,
                    totalDueAmount: action.response.data.CustomObject.TotalDueAmount,
                }
            } else {
                return {
                    ...state,
                    uiState: "empty",
                }
            }

        case GET_PROPERTY_DUE_PAYMENTS_FAIL:
            return {
                ...state,
                uiState: "error",
            }

        case GET_PROPERTY_DUE_PAYMENTS_ALERT:
            return {
                ...state,
                uiState: "error",
            }

        case GET_PROPERTY_DUE_PAYMENTS_RESET_STATE:
            return {
                uiState: "",
                list: [],
                totalDueAmount: 0,
            }

        // Payment integration payload
        case GET_PAYMENT_INTEGRATION_PAYLOAD:
            return {
                ...state,
                paymentIntegrationApiState: "loading",
            }

        case GET_PAYMENT_INTEGRATION_PAYLOAD_SUCCESS:
            return {
                ...state,
                paymentIntegrationApiState: "ideal",
                paymentIntegrationPayload: action.response.data.CustomObject
            }

        case GET_PAYMENT_INTEGRATION_PAYLOAD_FAIL:
            return {
                ...state,
                paymentIntegrationApiState: "error",
            }

        case GET_PAYMENT_INTEGRATION_PAYLOAD_ALERT:
            return {
                ...state,
                paymentIntegrationApiState: "alert",
            }


        // Payment integration status check
        case PAYMENT_INTEGRATION_STATUS_CHECK:
            return {
                ...state,
                statusCheckApiState: "loading",
            }

        case PAYMENT_INTEGRATION_STATUS_CHECK_SUCCESS:
            return {
                ...state,
                statusCheckApiState: "succcess",
                paymentStatus: (action.response.data.CustomObject && action.response.data.CustomObject.PaymentStatus) ? action.response.data.CustomObject.PaymentStatus : "Failed",
                TransactionNo: action.response.data?.CustomObject?.TransactionNo
            }

        case PAYMENT_INTEGRATION_STATUS_CHECK_FAIL:
            return {
                ...state,
                statusCheckApiState: "fail",
            }

        case PAYMENT_INTEGRATION_STATUS_CHECK_ALERT:
            return {
                ...state,
                statusCheckApiState: "fail",
            }

        default:
            return state
    }
}
