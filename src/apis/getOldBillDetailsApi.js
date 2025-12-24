import conf from '../config'
import axios from 'axios'

const getOldBillDetailsApi = async (params) => {
    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_AuthService/ViewDetail`,
        data: {
            ApiKey: "GetWaterReceiptDetails",
            OrgId: params.OrgId,
            ApiParams: {
                BillNo: params.BillNo
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "AuthToken": params.AuthToken,
            "AuthTokenKey": params.AuthTokenKey,
        }
    })

    return response
}

export default getOldBillDetailsApi