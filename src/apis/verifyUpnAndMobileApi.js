import conf from './../config'
import axios from 'axios'

const verifyUpnAndMobileApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_AuthService/ValidateUPNDetails`,
        data: {
            "ApiKey": "ValidateUPNCredentialAndSendOTPForPortal",
            "OrgId": params.OrgId,
            "ApiParams": {
                "OrgId": params.OrgId,
                "UPN": params.upn,
                "OwnerId": 0,
                "MobileNumber": params.mobile,
                "ApplicationType": params.ApplicationType,
                "ContextType": params.ContextType,
                "ApplicationId": params.ApplicationId,
                "PurchaserId": params.PurchaserId,
                "TransferPermissionNo": params.TransferPermissionNo,
                "ProfessionalName": params.ProfessionalName,
                "IsRenewal": params.IsRenewal
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    });

    return response
};

export default verifyUpnAndMobileApi