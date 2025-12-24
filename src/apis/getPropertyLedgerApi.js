import conf from '../config'
import axios from 'axios'

export const getPropertyLedgerApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthAdminService/GetData`,
        data: {
            "ApiKey": "GetPropertyLedger",
            "OrgId": params.OrgId,
            "ApiParams": {
                "TransTypeId": params.TransTypeId,
                "propertyRefId": params.propertyRefId
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "AuthToken": params.AuthToken,
            "AuthTokenKey": params.AuthTokenKey,
            "ArchitectToken": params.ArchitectToken,
            "ArchitectTokenKey": params.ArchitectTokenKey,
        }
    })

    return response
}

export default getPropertyLedgerApi