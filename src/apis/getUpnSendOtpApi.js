import conf from '../config'
import axios from 'axios'

export const getUpnSendOtpApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_AuthService/ViewDetail`,
        data: {
            "ApiKey": "ValidateKnowYourUPNDataAndSendOTP",
            "OrgId": params.AuthorityId,
            "ApiParams": {
                "OrgId": params.AuthorityId,
                "SectorId": params.SectorId,
                "UsageTypeId": params.UsageTypeId,
                "PropertyTypeId": params.PropertyTypeId,
                "PropertyRefId": params.PropertyNumberId,
                "AllotmentNumber": params.AllotmentNumber,
                "OwnerName": params.AlloteeName,
                "MobileNumber": params.MobileNumber,
                "EmailAddress": params.EmailAddress,
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            // "AuthToken": params.AuthToken,
            // "AuthTokenKey": params.AuthTokenKey,
        }
    });

    return response
}

export default getUpnSendOtpApi