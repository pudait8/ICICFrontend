import {
    LINKED_PROPERTY_REQUEST_LIST,
    LINKED_PROPERTY_REQUEST_LIST_SUCCESS,
    LINKED_PROPERTY_REQUEST_LIST_FAIL,
    LINKED_PROPERTY_REQUEST_LIST_ALERT,
} from "../actions/LinkedPropertyAction"


const initialState = {
    list: [],
    uiState: "", // loading, ideal, empty, notFound, error
    totalRecords: 0
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LINKED_PROPERTY_REQUEST_LIST:
            return {
                ...state,
                list: [],
                uiState: "loading",
            }

        case LINKED_PROPERTY_REQUEST_LIST_SUCCESS:
            if (action.response.data.TotalRecordCount > 0) { /* If any property is linked */
                if (action.response.data.FilteredRecordCount > 0) { /* If result found, display ideal state */
                    return {
                        ...state,
                        list: action.response.data.CustomObject,
                        uiState: "ideal",
                        totalRecords: action.response.data.FilteredRecordCount
                    }
                } else { /* If no result found, display notFound state */
                    return {
                        ...state,
                        list: [],
                        uiState: "notFound",
                    }
                }
            } else { /* If no property linked, display empty state */
                return {
                    ...state,
                    list: [],
                    uiState: "empty",
                }
            }

        case LINKED_PROPERTY_REQUEST_LIST_FAIL:
            return {
                ...state,
                list: [],
                uiState: "error",
            }

        case LINKED_PROPERTY_REQUEST_LIST_ALERT:
            return {
                ...state,
                list: [],
                uiState: "error",
            }

        default:
            return state
    }
}
