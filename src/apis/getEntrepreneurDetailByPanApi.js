import conf from '../config'
import axios from 'axios'

export const getEntrepreneurDetailByPanApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthPortalService/GetData`,
        data: {
            "ApiKey": "GetEntrepreneurDetailByPanNumber",
            "OrgId": params.OrgId,
            "ApiParams": {
                "PanNumber": params.PAN
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "AuthToken": params.AuthToken,
            "AuthTokenKey": params.AuthTokenKey,
        }
    });

    return response
}

export default getEntrepreneurDetailByPanApi