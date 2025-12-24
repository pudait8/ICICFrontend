import conf from '../config'
import axios from 'axios'

const getApplListByMobileNoApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthPortalService/GetData`,
        data: {
            ApiKey: "GetApplListByMobileNo",
            OrgId: params.OrgId,
            ApiParams: {
                MobileNumber: params.MobileNumber,
                ApplicationTypeId: params.ApplicationTypeId
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

export default getApplListByMobileNoApi