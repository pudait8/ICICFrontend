import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_ALERT,
    LOGIN_RESET_STATE,
    LOGIN_RESET_LOGGED_IN
} from '../actions/loginAction'
import strings from "../strings.json"
import { isUserLoggedIn } from '../utils'
import { notification } from "antd"

const initialState = {
    apiState: "", // loading, success, alert, error
    apiMessage: "",
    data: {},
    isUserLoggedIn: isUserLoggedIn(),
    AuthId: null,
    AuthKey: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                apiState: "loading",
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                apiState: "success",
                apiMessage: action.response.data.Message,
                data: action.response.data.CustomObject,
                isUserLoggedIn: true,
                AuthId: action.response.headers.authid,
                AuthKey: action.response.headers.authkey,
            }

        case LOGIN_ALERT:
            return {
                ...state,
                apiState: "alert",
                apiMessage: action.response.data.Message
            }

        case LOGIN_FAIL:
            return {
                ...state,
                apiState: "error",
                apiMessage: strings.api_err_msg
            }

        case LOGIN_RESET_STATE:
            return {
                ...state,
                apiState: "",
                apiMessage: "",
                data: {},
            }

        case LOGIN_RESET_LOGGED_IN:
            return {
                ...state,
                isUserLoggedIn: false
            }

        default:
            return state
    }
}
