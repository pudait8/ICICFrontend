import {
    REQUEST_AUTHORITY_LIST,
    REQUEST_AUTHORITY_LIST_SUCCESS,
    REQUEST_AUTHORITY_LIST_FAIL,
    REQUEST_AUTHORITY_LIST_ALERT,

    REQUEST_LOCATION_LIST,
    REQUEST_LOCATION_LIST_SUCCESS,
    REQUEST_LOCATION_LIST_FAIL,
    REQUEST_LOCATION_LIST_ALERT,

    REQUEST_SECTOR_LIST,
    REQUEST_SECTOR_LIST_SUCCESS,
    REQUEST_SECTOR_LIST_FAIL,
    REQUEST_SECTOR_LIST_ALERT,

    REQUEST_USAGE_TYPES_LIST,
    REQUEST_USAGE_TYPES_LIST_SUCCESS,
    REQUEST_USAGE_TYPES_LIST_FAIL,
    REQUEST_USAGE_TYPES_LIST_ALERT,

    REQUEST_PROPERTY_TYPE_LIST,
    REQUEST_PROPERTY_TYPE_LIST_SUCCESS,
    REQUEST_PROPERTY_TYPE_LIST_FAIL,
    REQUEST_PROPERTY_TYPE_LIST_ALERT,

    REQUEST_PROPERTY_NUMBER_LIST,
    REQUEST_PROPERTY_NUMBER_LIST_SUCCESS,
    REQUEST_PROPERTY_NUMBER_LIST_FAIL,
    REQUEST_PROPERTY_NUMBER_LIST_ALERT,

    GET_UPN_SEND_OTP,
    GET_UPN_SEND_OTP_SUCCESS,
    GET_UPN_SEND_OTP_FAIL,
    GET_UPN_SEND_OTP_ALERT,

    GET_UPN_NUMBER,
    GET_UPN_NUMBER_SUCCESS,
    GET_UPN_NUMBER_FAIL,
    GET_UPN_NUMBER_ALERT,

    GET_UPN_VERIFY_OTP,
    GET_UPN_VERIFY_OTP_SUCCESS,
    GET_UPN_VERIFY_OTP_FAIL,
    GET_UPN_VERIFY_OTP_ALERT,
    GTE_UPN_RESET_STATE
} from "../actions/GetUpnActions"


const initialState = {
    AuthorityList: null,
    AuthorityListRequestStatus: null,
    LocationList: null,
    LocationListRequestStatus: null,
    SectorList: null,
    SectorListRequestStatus: null,
    UsageTypesList: null,
    UsageTypesListRequestStatus: null,
    PropertyTypeList: null,
    PropertyTypeListRequestStatus: null,
    PropertyNumberList: null,
    PropertyNumberListRequestStatus: null,

    DisableDevelopmentAuthority: false,
    DisableLocation: false,
    DisableSector: false,
    DisableUsageType: false,
    DisablePropertyType: false,
    DisablePropertyNumber: false,

    LoadingDevelopmentAuthority: false,
    LoadingLocation: false,
    LoadingSector: false,
    LoadingUsageType: false,
    LoadingPropertyType: false,
    LoadingPropertyNumber: false,

    getUpnSendOtpStatus: null,
    getUpnSendOtpAlertMessage: "",
    loadingSubmit: false,
    visibleOtpModal: false,
    getUpnObjAfterOtp: null,

    getUpnVerifyOtpStatus: null,
    getUpnVerifyOtpAlertMessage: "",
    uiState: "ideal", // ideal, success

    resendOtpBtnType: "allow_send",
    resendOtpCountDown: 3,
    getUpnNumberStatus: null,
    getUpnNumberAlertMessage: "",
    getUpnData: ""
}

export default function (state = initialState, action) {
    switch (action.type) {

        // Authority list cases
        case REQUEST_AUTHORITY_LIST:
            return {
                ...state,
                AuthorityList: null,
                AuthorityListRequestStatus: "Request",
                DisableDevelopmentAuthority: true,
                DisableLocation: true,
                DisableSector: true,
                DisableUsageType: true,
                DisablePropertyType: true,
                DisablePropertyNumber: true,
                LoadingDevelopmentAuthority: true
            }

        case REQUEST_AUTHORITY_LIST_SUCCESS:
            return {
                ...state,
                AuthorityList: action.response.data.CustomObject,
                AuthorityListRequestStatus: "Success",
                DisableDevelopmentAuthority: false,
                LoadingDevelopmentAuthority: false
            }

        case REQUEST_AUTHORITY_LIST_FAIL:
            return {
                ...state,
                AuthorityList: null,
                AuthorityListRequestStatus: "Fail",
                LoadingDevelopmentAuthority: false
            }

        case REQUEST_AUTHORITY_LIST_ALERT:
            return {
                ...state,
                AuthorityList: null,
                AuthorityListRequestStatus: "Alert",
                LoadingDevelopmentAuthority: false
            }

        // Location list cases
        case REQUEST_LOCATION_LIST:
            return {
                ...state,
                LocationList: null,
                LocationListRequestStatus: "Request",
                DisableLocation: true,
                DisableSector: true,
                DisableUsageType: true,
                DisablePropertyType: true,
                DisablePropertyNumber: true,
                LoadingLocation: true
            }

        case REQUEST_LOCATION_LIST_SUCCESS:
            return {
                ...state,
                LocationList: action.response.data.CustomObject,
                LocationListRequestStatus: "Success",
                DisableLocation: false,
                LoadingLocation: false
            }

        case REQUEST_LOCATION_LIST_FAIL:
            return {
                ...state,
                LocationList: null,
                LocationListRequestStatus: "Fail",
                LoadingLocation: false
            }

        case REQUEST_LOCATION_LIST_ALERT:
            return {
                ...state,
                LocationList: null,
                LocationListRequestStatus: "Alert",
                LoadingLocation: false
            }

        // Sector list cases
        case REQUEST_SECTOR_LIST:
            return {
                ...state,
                SectorList: null,
                SectorListRequestStatus: "Request",
                DisableSector: true,
                DisableUsageType: true,
                DisablePropertyType: true,
                DisablePropertyNumber: true,
                LoadingSector: true
            }

        case REQUEST_SECTOR_LIST_SUCCESS:
            return {
                ...state,
                SectorList: action.response.data.CustomObject,
                SectorListRequestStatus: "Success",
                DisableSector: false,
                LoadingSector: false
            }

        case REQUEST_SECTOR_LIST_FAIL:
            return {
                ...state,
                SectorList: null,
                SectorListRequestStatus: "Fail",
                LoadingSector: false
            }

        case REQUEST_SECTOR_LIST_ALERT:
            return {
                ...state,
                SectorList: null,
                SectorListRequestStatus: "Alert",
                LoadingSector: false
            }

        // UsageTypes list cases
        case REQUEST_USAGE_TYPES_LIST:
            return {
                ...state,
                UsageTypesList: null,
                UsageTypesListRequestStatus: "Request",
                DisableUsageType: true,
                DisablePropertyType: true,
                DisablePropertyNumber: true,
                LoadingUsageType: true
            }

        case REQUEST_USAGE_TYPES_LIST_SUCCESS:
            return {
                ...state,
                UsageTypesList: action.response.data.CustomObject,
                UsageTypesListRequestStatus: "Success",
                DisableUsageType: false,
                LoadingUsageType: false
            }

        case REQUEST_USAGE_TYPES_LIST_FAIL:
            return {
                ...state,
                UsageTypesList: null,
                UsageTypesListRequestStatus: "Fail",
                LoadingUsageType: false
            }

        case REQUEST_USAGE_TYPES_LIST_ALERT:
            return {
                ...state,
                UsageTypesList: null,
                UsageTypesListRequestStatus: "Alert",
                LoadingUsageType: false
            }

        // PropertyType list cases
        case REQUEST_PROPERTY_TYPE_LIST:
            return {
                ...state,
                PropertyTypeList: null,
                PropertyTypeListRequestStatus: "Request",
                DisablePropertyType: true,
                DisablePropertyNumber: true,
                LoadingPropertyType: true
            }

        case REQUEST_PROPERTY_TYPE_LIST_SUCCESS:
            return {
                ...state,
                PropertyTypeList: action.response.data.CustomObject,
                PropertyTypeListRequestStatus: "Success",
                DisablePropertyType: false,
                LoadingPropertyType: false
            }

        case REQUEST_PROPERTY_TYPE_LIST_FAIL:
            return {
                ...state,
                PropertyTypeList: null,
                PropertyTypeListRequestStatus: "Fail",
                LoadingPropertyType: false
            }

        case REQUEST_PROPERTY_TYPE_LIST_ALERT:
            return {
                ...state,
                PropertyTypeList: null,
                PropertyTypeListRequestStatus: "Alert",
                LoadingPropertyType: false
            }

        // PropertyNumber list cases
        case REQUEST_PROPERTY_NUMBER_LIST:
            return {
                ...state,
                PropertyNumberList: null,
                PropertyNumberListRequestStatus: "Request",
                LoadingPropertyNumber: true
            }

        case REQUEST_PROPERTY_NUMBER_LIST_SUCCESS:
            return {
                ...state,
                PropertyNumberList: action.response.data.CustomObject,
                PropertyNumberListRequestStatus: "Success",
                LoadingPropertyNumber: false
            }

        case REQUEST_PROPERTY_NUMBER_LIST_FAIL:
            return {
                ...state,
                PropertyNumberList: null,
                PropertyNumberListRequestStatus: "Fail",
                LoadingPropertyNumber: false
            }

        case REQUEST_PROPERTY_NUMBER_LIST_ALERT:
            return {
                ...state,
                PropertyNumberList: null,
                PropertyNumberListRequestStatus: "Alert",
                LoadingPropertyNumber: false
            }

        // getUpnSendOtp cases
        case GET_UPN_SEND_OTP:
            return {
                ...state,
                getUpnSendOtpStatus: "Request",
                loadingSubmit: true,
                visibleOtpModal: false,
                getUpnObjAfterOtp: null,
                resendOtpBtnType: "sending"

            }

        case GET_UPN_SEND_OTP_SUCCESS:
            let resendOtpBtnTypeValue
            if (state.resendOtpCountDown > 0) {
                resendOtpBtnTypeValue = "allow_send"
            } else {
                resendOtpBtnTypeValue = "not_allow"
            }
            return {
                ...state,
                getUpnSendOtpStatus: "Success",
                loadingSubmit: false,
                visibleOtpModal: true,
                getUpnObjAfterOtp: action.response.data.CustomObject,
                resendOtpCountDown: state.resendOtpCountDown - 1,
                resendOtpBtnType: resendOtpBtnTypeValue
            }

        case GET_UPN_SEND_OTP_FAIL:
            return {
                ...state,
                getUpnSendOtpStatus: "Fail",
                loadingSubmit: false,
                resendOtpBtnTypeValue: "allow_send"
            }

        case GET_UPN_SEND_OTP_ALERT:
            return {
                ...state,
                getUpnSendOtpStatus: "Alert",
                getUpnSendOtpAlertMessage: action.response.data.Message,
                loadingSubmit: false,
                resendOtpBtnTypeValue: "allow_send"
            }


        // getUpnSendOtp cases
        case GET_UPN_NUMBER:
            return {
                ...state,
                getUpnNumberStatus: "Request",
                loadingSubmit: true,
                visibleOtpModal: false,

            }

        case GET_UPN_NUMBER_SUCCESS:
            return {
                ...state,
                getUpnNumberStatus: "Success",
                loadingSubmit: false,
                visibleOtpModal: true,
                getUpnData: action.response.data.CustomObject,
            }

        case GET_UPN_NUMBER_FAIL:
            return {
                ...state,
                getUpnNumberStatus: "Fail",
                loadingSubmit: false,
            }

        case GET_UPN_NUMBER_ALERT:
            return {
                ...state,
                getUpnNumberStatus: "Alert",
                getUpnNumberAlertMessage: action.response.data.Message,
                loadingSubmit: false,
            }

        // getUpnVerifyOtp cases
        case GET_UPN_VERIFY_OTP:
            return {
                ...state,
                getUpnVerifyOtpStatus: "Request",
            }

        case GET_UPN_VERIFY_OTP_SUCCESS:
            return {
                ...state,
                getUpnVerifyOtpStatus: "Success",
                uiState: "success"
            }

        case GET_UPN_VERIFY_OTP_FAIL:
            return {
                ...state,
                getUpnVerifyOtpStatus: "Fail",
            }

        case GET_UPN_VERIFY_OTP_ALERT:
            return {
                ...state,
                getUpnVerifyOtpStatus: "Alert",
                getUpnVerifyOtpAlertMessage: action.response.data.Message
            }

        case GTE_UPN_RESET_STATE:
            return initialState

        default:
            return state
    }
}
