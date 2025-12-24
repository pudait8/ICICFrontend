import {
    GET_DRAWING_SCRUTINY_REPORT,
    GET_DRAWING_SCRUTINY_REPORT_SUCCESS,
    GET_DRAWING_SCRUTINY_REPORT_FAIL,
    GET_DRAWING_SCRUTINY_REPORT_ALERT,
    GET_DRAWING_SCRUTINY_REPORT_RESET_STATE
} from "../actions/getDrawingScrutinyReportAction"


const initialState = {
    apiState: "", // loading, success, empty, error
    list: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DRAWING_SCRUTINY_REPORT:
            return {
                ...state,
                apiState: "loading",
            }

        case GET_DRAWING_SCRUTINY_REPORT_SUCCESS:
            return {
                ...state,
                apiState: "success",
                list: action.response.data.CustomObject,
            }


        case GET_DRAWING_SCRUTINY_REPORT_FAIL:
            return {
                ...state,
                apiState: "error",
            }

        case GET_DRAWING_SCRUTINY_REPORT_ALERT:
            return {
                ...state,
                apiState: "error",
            }

        case GET_DRAWING_SCRUTINY_REPORT_RESET_STATE:
            return initialState


        default:
            return state
    }
}
