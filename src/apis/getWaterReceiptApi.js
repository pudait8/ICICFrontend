import conf from '../config'
import axios from 'axios'
import { getGeoLocation } from '../utils'

const getWaterReceiptApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_AuthService/ViewDetail`,
        data: {
            "ApiKey": "GetWaterPaymentDetails",
            "OrgId": params.OrgId,
            "ApiParams": {
                "BillId": params.billNo,
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

export default getWaterReceiptApi