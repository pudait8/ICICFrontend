import {
    GET_PROPERTY_ALL_PAYMENTS,
    GET_PROPERTY_ALL_PAYMENTS_SUCCESS,
    GET_PROPERTY_ALL_PAYMENTS_FAIL,
    GET_PROPERTY_ALL_PAYMENTS_ALERT,
} from "../actions/getPropertyAllPaymentsAction"


const initialState = {
    uiState: "", // loading, ideal, empty, error, notFound
    list: [],
    totalRecords: 0,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROPERTY_ALL_PAYMENTS:
            return {
                ...state,
                uiState: "loading",
            }

        case GET_PROPERTY_ALL_PAYMENTS_SUCCESS:
            if (action.response.data.TotalRecordCount > 0) {
                if (action.response.data.FilteredRecordCount > 0) {
                    return {
                        ...state,
                        list: action.response.data.CustomObject,
                        uiState: "ideal",
                        totalRecords: action.response.data.FilteredRecordCount
                    }
                } else {
                    return {
                        ...state,
                        list: [],
                        uiState: "notFound",
                    }
                }
            } else {
                return {
                    ...state,
                    list: [],
                    uiState: "empty",
                }
            }

        case GET_PROPERTY_ALL_PAYMENTS_FAIL:
            return {
                ...state,
                list: [],
                uiState: "error",
            }

        case GET_PROPERTY_ALL_PAYMENTS_ALERT:
            return {
                ...state,
                list: [],
                uiState: "error",
            }

        default:
            return state
    }
}
