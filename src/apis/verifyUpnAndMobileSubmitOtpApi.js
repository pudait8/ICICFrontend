import conf from './../config'
import axios from 'axios'

const verifyUpnAndMobileSubmitOtpApi = async (params) => {
    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_AuthService/ValidateOTP`,
        data: {
            "ApiKey": "ValidateOTPForPropertyValidationForPortal",
            "OrgId": params.OrgId,
            "ApiParams": {
                "OrgId": params.OrgId,
                "PropertyRefId": params.PropertyRefId,
                "OwnerId": params.OwnerId,
                "MobileNumber": params.MobileNumber,
                "UPN": params.upn,
                "ApplicationType": params.ApplicationType,
                "TransactionNumber": params.TransactionNumber,
                "OTP": params.OTP,
                "ContextType": params.ContextType,
                "ApplicationId": params.ApplicationId,
                "OwnerName": params.OwnerName,
                "PurchaserId": params.PurchaserId,
                "TransferPermissionNo": params.TransferPermissionNo,
                "ProfessionalName": params.ProfessionalName,
                "IsRenewal": params.IsRenewal,
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    });

    return response
};

export default verifyUpnAndMobileSubmitOtpApi