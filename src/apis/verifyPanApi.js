import conf from '../config'
import axios from 'axios'

const verifyPanApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_AuthService/ValidatePANDetails`,
        data: {
            "ApiKey": "ValidatePANAndSendOTP",
            "OrgId": params.OrgId,
            "ApiParams": {
                OrgId: params.OrgId,
                PAN: params.PAN,
                ContextType: params.ContextType
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

    return response
}

export default verifyPanApi