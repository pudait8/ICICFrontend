import conf from '../config'
import axios from 'axios'

export const getUpnVerifyOtpApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_AuthService/ViewDetail`,
        data: {
            "ApiKey": "ValidateOTPForKnowYourUPNData",
            "OrgId": params.OrgId,
            "ApiParams": params
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            // "AuthToken": params.AuthToken,
            // "AuthTokenKey": params.AuthTokenKey,
        }
    });

    return response
}

export default getUpnVerifyOtpApi