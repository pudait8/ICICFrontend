import conf from '../config'
import axios from 'axios'
import { getLang, windowPath, getGeoLocation } from '../utils'

export const paymentIntegrationStatusCheckApi = async (params) => {
    // console.log('paymentIntegrationStatusCheckApi', params.checkForWater)
    const response = await axios({
        method: 'post',
        url: params.checkForWater ? `${conf.api.base_url}Gateway_AuthService/ViewDetail` : `${conf.api.base_url}Gateway_PostAuthPortalService/GetData`,
        data: {
            "ApiKey": params.checkForWater ? "GetWaterTransactionStatus" : "GetOnlineTransactionStatus",
            "OrgId": params.OrgId,
            "ApiParams": {
                "UniqueId": params.UniqueId,
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "AuthToken": params.AuthToken,
            "AuthTokenKey": params.AuthTokenKey,
            "Language": getLang(),
            "FormURL": windowPath(),
            "GeoLocation": getGeoLocation(),
        }
    })

    return response
}

export default paymentIntegrationStatusCheckApi