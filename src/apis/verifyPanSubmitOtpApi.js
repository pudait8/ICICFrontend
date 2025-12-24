import conf from '../config'
import axios from 'axios'

const verifyUpnAndMobileSubmitOtpApi = async (params) => {
    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_AuthService/ValidatePANOTP`,
        data: {
            "ApiKey": "ValidateOTPForArchitect",
            "OrgId": params.OrgId,
            "ApiParams": {
                "OrgId": params.OrgId,
                "EnterprenurId": params.EnterprenurId,
                "PAN": params.PAN,
                "MobileNumber": params.MobileNumber,
                "TransactionNumber": params.TransactionNumber,
                "OTP": params.OTP,
                "ContextType": params.ContextType,
                "ArchitectName": params.ArchitectName,
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    });

    return response
};

export default verifyUpnAndMobileSubmitOtpApi