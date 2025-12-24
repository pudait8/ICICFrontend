import conf from '../config'
import axios from 'axios'

export const getNocByUpnApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_AuthService/ViewDetail`,
        data: {
            "ApiKey": "GetNOCByUPN",
            "OrgId": params.OrgId,
            "ApiParams": {
                "OrgId": params.OrgId,
                "UPN": params.UPN,
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    });

    return response
}

export default getNocByUpnApi