import {
    GET_MY_DOCUMENTS_LIST,
    GET_MY_DOCUMENTS_LIST_SUCCESS,
    GET_MY_DOCUMENTS_LIST_FAIL,
    GET_MY_DOCUMENTS_LIST_ALERT,
} from "../actions/getMyDocumentsListAction"


const initialState = {
    apiState: "", // loading, success, empty, error
    uploadedList: [],
    loiDocuments: [],
    issuedList: [],
    propertyDocuments: [],
    uploadedCount: 0,
    issuedCount: 0,
    loiDocumentsCount: 0,
    propertyCount: 0,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MY_DOCUMENTS_LIST:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_MY_DOCUMENTS_LIST_SUCCESS:
            return {
                ...state,
                apiState: "success",
                uploadedList: action.response.data.CustomObject.UploadedDocuments,
                loiDocuments: action.response.data.CustomObject.LOIDocuments,
                issuedList: action.response.data.CustomObject.IssuedDocuments,
                propertyDocuments: action.response.data.CustomObject.PropertyDocuments,
                uploadedCount: action.response.data.CustomObject.UploadedDocuments.length,
                loiDocumentsCount: action.response.data.CustomObject.LOIDocuments.length,
                issuedCount: action.response.data.CustomObject.IssuedDocuments.length,
                propertyCount: action.response.data.CustomObject.PropertyDocuments.length,
            }


        case GET_MY_DOCUMENTS_LIST_FAIL:
            return {
                ...state,
                apiState: "error",
            }

        case GET_MY_DOCUMENTS_LIST_ALERT:
            return {
                ...state,
                apiState: "error",
            }

        default:
            return state
    }
}
