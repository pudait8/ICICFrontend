import conf from '../config'
import axios from 'axios'

export const getZoningDetailApi = async (params) => {
    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_AuthService/ViewDetail`,
        data: {
            "ApiKey": "GetPropertyZoningDetails",
            "OrgId": params.OrgId,
            "ApiParams": {
                "PropertyId": params.PropertyId
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    });

    return response
}

export default getZoningDetailApi