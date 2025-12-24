import conf from '../config'
import axios from 'axios'
import { getGeoLocation } from '../utils'

const getWaterPaymentLinkApi = async (params) => {

    // console.log('getWaterPaymentLinkApi params', params)
    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_AuthService/ViewDetail`,
        data: {
            "ApiKey": "GenerateWaterPaymentRequest",
            "OrgId": params.OrgId,
            "ApiParams": {
                ...params
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            // "Language": getLang(),
            // "FormURL": windowPath(),
            "GeoLocation": getGeoLocation(),
        }
    })

    return response
}

export default getWaterPaymentLinkApi