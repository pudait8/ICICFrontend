import conf from '../config'
import axios from 'axios'

export const transferApplicationDeletePurchaserApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthPortalService/GetData`,
        data: {
            "ApiKey": "DeletePurchaser",
            "OrgId": params.OrgId,
            "ApiParams": {
                "PurchaserId": params.PurchaserId,
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

export default transferApplicationDeletePurchaserApi