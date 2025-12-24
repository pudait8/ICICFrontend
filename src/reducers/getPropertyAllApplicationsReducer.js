import {
    GET_PROPERTY_ALL_APPLICATIONS,
    GET_PROPERTY_ALL_APPLICATIONS_SUCCESS,
    GET_PROPERTY_ALL_APPLICATIONS_FAIL,
    GET_PROPERTY_ALL_APPLICATIONS_ALERT,
} from "../actions/getPropertyAllApplicationsAction"


const initialState = {
    uiState: "", // loading, ideal, empty, error
    list: [],
    totalRecords: 0
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROPERTY_ALL_APPLICATIONS:
            return {
                ...state,
                uiState: "loading",
            }

        case GET_PROPERTY_ALL_APPLICATIONS_SUCCESS:
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

        case GET_PROPERTY_ALL_APPLICATIONS_FAIL:
            return {
                ...state,
                list: [],
                uiState: "error",
            }

        case GET_PROPERTY_ALL_APPLICATIONS_ALERT:
            return {
                ...state,
                list: [],
                uiState: "error",
            }

        default:
            return state
    }
}
